const Statement = require("../models/Statement");
const Offer = require("../models/Offer");

const getStatements = async (req, res) => {
  const { params, query } = req
  const { search } = query
  try {
    const { sortField, sortOrder } = params;
    const sortQuery = {};
    let whereQuery = { $and: [] };

    if (sortField) {
      switch (sortField) {
        default:
          sortQuery[`${sortField}`] = sortOrder === 'asc' ? 1 : -1;
      }
    }

    if (search) {
      whereQuery.$and.push({
        $or: [
          {
            name: { $regex: '.*' + search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.*', $options: 'i' }
          }
        ]
      });
    }

    if (!whereQuery.$and.length) {
      whereQuery = {};
    }

    const statements = await Statement.find(whereQuery).sort(sortQuery);

    return res.status(200).send({
      message: "Success get statements",
      statements
    });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const updateStatement = async (req, res) => {
  const { params: { statementId }, body } = req
  try {
    const statement = await Statement.findOneAndUpdate({ statementId }, { ...body });

    return res.status(200).send({ message: "Success update statement", statement });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const deleteStatement = async (req, res) => {
  const { params: { statementId }, body } = req
  try {
    const statement = await Statement.findOneAndDelete({ statementId });

    return res.status(200).send({ message: "Success delete statement", statement });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const getStatement = async (req, res) => {
  const { params: { statementId } } = req
  try {
    const statement = await Statement.findOne({ statementId });

    return res.status(200).send({ message: "Success get statement", statement });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const createStatement = async (req, res) => {
  const { body } = req
  try {
    const statement = await Statement.create({ ...body });

    return res.status(200).send({ message: "Success create statement", statement });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}


const startAlgorithm = async (req, res) => {
  try {
    const statements = await Statement.find({ statementStatus: { $nin: ['Скасовано вступником', 'Скасовано (втрата пріор.)', 'Відмова'] }, priority: { $ne: null } }, { offerName: 1, competitiveScore: 1, priority: 1, statementId: 1, statementStatus: 1, personaId: 1 }).sort({ competitiveScore: -1 });
    const offers = await Offer.find({ offerId: '537714' }, { name: 1, offerId: 1, seatsNumber: 1 });
    const statementsToOffer = offers.reduce((acc, { offerId, name, seatsNumber }, index) => {
      const filterStatements = statements.filter(statement => statement.offerName === name).sort((a, b) => a.priority - b.priority)
      if (filterStatements.length) {
        acc[offerId] = { filterStatements, seatsNumber }
      }
      console.log(filterStatements)
      return acc
    }, {})

    return res.status(200).send({ message: "Success update statements statuses", statementsToOffer });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

module.exports = { getStatements, updateStatement, createStatement, deleteStatement, getStatement, startAlgorithm }
