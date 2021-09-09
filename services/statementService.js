const Statement = require("../models/Statement");

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

module.exports = { getStatements }
