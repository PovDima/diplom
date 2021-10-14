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

    const statements = await Statement.find({ statementStatus: { $nin: ['Скасовано вступником', 'Скасовано (втрата пріор.)', 'Відмова'] }, priority: { $ne: null } }, { offerName: 1, competitiveScore: 1, priority: 1, statementId: 1, statementStatus: 1, personaId: 1 }).sort({ competitiveScore: -1 });
    const offers = await Offer.find({ educationalDegree: 'Магістр' }, { name: 1, offerId: 1, seatsNumber: 1 });

    const statementsToOffer = offers.reduce((acc, { offerId, name, seatsNumber }, index) => {
      const filterStatements = statements.filter(statement => statement.offerName === name)
      if (filterStatements.length) {
        acc[offerId] = { filterStatements, seatsNumber }
      }
      return acc
    }, {})
    // 1 прохожу по спец и проверяю 1 приоритеты если проходят, то удаляем с других и там по всем
    // 2 проверяем на первый приоритет еще раз может появмиллись новые
    // 3 проверям пока все первые не будут отмечены кака проходят
    // 4 тоже самое по второму и опять по первому пока не выполниться условие 3  
    // 5 потом повторяем шаг 4

    console.timeEnd('a')
    process.exit()
  })();
}).catch(() => {
  process.exit()
});

