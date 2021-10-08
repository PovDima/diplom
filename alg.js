const mongoose = require('mongoose');
require('dotenv').config('./.env');

const Statement = require("./models/Statement");
const Offer = require("./models/Offer");
const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_ATLAS, PORT } = process.env

const db = MONGO_ATLAS ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@masterdegree.xomet.mongodb.net/masterdegree?retryWrites=true&w=majority` : "mongodb://localhost:27017/masterdegree"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(db, options).then(() => {
  (async () => {
    console.time('a')
    const statements = await Statement.find({ statementStatus: { $nin: ['Скасовано вступником'] }, priority: { $ne: null } }, { offerName: 1, competitiveScore: 1, priority: 1, statementId: 1 }).sort({ competitiveScore: -1 });
    const offers = await Offer.find();
    const statementsToOffer = offers.reduce((acc, offer) => {
      const filterStatements = statements.filter(statement => statement.offerName === offer.name).sort((a, b) => a.priority - b.priority)
      if (filterStatements.length) {
        acc[offer.offerId] = filterStatements
      }

      return acc
    }, {})

    console.log(statementsToOffer)
    console.timeEnd('a')
    process.exit()
  })();
}).catch(() => {
  process.exit()
});





