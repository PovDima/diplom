const mongoose = require('mongoose');
require('dotenv').config('./.env');
const fs = require('fs')

const Statement = require("./models/Statement");
const Offer = require("./models/Offer");
const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_ATLAS, PORT } = process.env

const db = MONGO_ATLAS ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@masterdegree.xomet.mongodb.net/masterdegree?retryWrites=true&w=majority` : "mongodb://localhost:27017/masterdegree"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(db, options).then(async () => {
  (async () => {
    console.log('conected')
    console.time('a')
    const finalUpdates = []
    const statements = await Statement.find(
      { statementStatus: { $nin: ['Скасовано вступником', 'Скасовано (втрата пріор.)', 'Відмова'] }, priority: { $ne: null } },
      { offerName: 1, competitiveScore: 1, priority: 1, statementId: 1, statementStatus: 1, personaId: 1 }
    ).sort({ competitiveScore: -1 });
    const offers = await Offer.find({ educationalDegree: 'Магістр' }, { name: 1, offerId: 1, seatsNumber: 1 });

    const statementsToOffer = offers.reduce((acc, { offerId, name, seatsNumber }, index) => {
      const filterStatements = statements.reduce((acc, el) => {
        if (el.offerName === name) {
          acc.push({ ...el.toObject(), isSorted: false });
        }
        return acc;
      }, []);
      if (filterStatements.length) {
        acc[offerId] = { filterStatements, seatsNumber }
      }
      return acc
    }, {})

    const removeFromAllArrays = (personaId, iterator, priority) => {
      for (const key in iterator) {
        const index = iterator[key].filterStatements.findIndex(el => el.personaId === personaId && el.isSorted !== true && el.priority !== priority)
        index > 0 ? iterator[key].filterStatements.splice(index, 1) : null
      }
    }
    const goThroughArray = (array, priority) => {
      for (const key in statementsToOffer) {
        const offer = statementsToOffer[key]
        for (let i = 0; i < offer.seatsNumber; i++) {
          const el = offer.filterStatements[i];
          if (el.priority === priority) {
            el.isSorted = true
            removeFromAllArrays(el.personaId, statementsToOffer, priority)
          }
        }
      }
      let repeat = false
      for (const key in statementsToOffer) {
        const offer = statementsToOffer[key]
        for (let i = 0; i < offer.seatsNumber; i++) {
          const el = offer.filterStatements[i];
          if (el.priority === priority) {
            if (el.isSorted !== true) repeat = true
          }
        }
      }
      if (repeat) goThroughArray(statementsToOffer, priority)
    }

    goThroughArray(statementsToOffer, 1)
    goThroughArray(statementsToOffer, 2)
    goThroughArray(statementsToOffer, 3)
    goThroughArray(statementsToOffer, 4)
    goThroughArray(statementsToOffer, 5)

    for (const key in statementsToOffer) {
      const offer = statementsToOffer[key]
      offer.filterStatements.splice(offer.seatsNumber)
      finalUpdates.push(...offer.filterStatements)
    }

    // await Statement.find(
    //   { statementId: { $in: finalUpdates.map(el => el.statementId) } },
    //   { statementStatus: 'Рекомендовано (бюджет)' }
    // )
    for (const key in statementsToOffer) {
      console.log(statementsToOffer[key].filterStatements.length)
    }

    fs.writeFile('test.json', JSON.stringify(statementsToOffer), err => {
      if (err) {
        console.error(err)
        return
      }

      console.timeEnd('a')
      process.exit()
    })
  })();
}).catch(() => {
  process.exit()
});

