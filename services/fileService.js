const { parseCsv, offerTrasform, statementsTransform } = require('../utils/transform')
const Offer = require("../models/Offer");
const Statement = require("../models/Statement");

const importFile = async (req, res) => {
  try {
    const { params, files: { file } } = req
    const { type } = params
    const rows = [];
    await parseCsv(rows, file.path)
    if (type === 'offer') {
      const trasformedRows = offerTrasform(rows)
      const offers = await Offer.insertMany(trasformedRows, { ordered: false })

      return res.status(200).send({ message: "Файл успішно імпортований", length: offers.length });
    } else {
      const trasformedRows = statementsTransform(rows)
      const statements = await Statement.insertMany(trasformedRows, { ordered: false })

      return res.status(200).send({ message: "Файл успішно імпортований", length: statements.length });
    }
  } catch (err) {
    console.log(err.message)
    if (err.message.includes('E11000 duplicate key error')) { return res.status(200).send({ message: "Файл успішно імпортований" }) }
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

module.exports = { importFile }
