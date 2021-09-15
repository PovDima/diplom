const Offer = require("../models/Offer");

const getOffers = async (req, res) => {
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

    const offers = await Offer.find(whereQuery).sort(sortQuery);

    return res.status(200).send({
      message: "Success get offers",
      offers
    });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const updateOffer = async (req, res) => {
  const { params: { offerId }, body } = req
  try {
    const offer = await Offer.findOneAndUpdate({ offerId }, { ...body });

    return res.status(200).send({ message: "Success update offer", offer });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const deleteOffer = async (req, res) => {
  const { params: { offerId }, body } = req
  try {
    const offer = await Offer.findOneAndDelete({ offerId });

    return res.status(200).send({ message: "Success delete offer", offer });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const getOffer = async (req, res) => {
  const { params: { offerId } } = req
  try {
    const offer = await Offer.findOne({ offerId });

    return res.status(200).send({ message: "Success get offer", offer });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const createOffer = async (req, res) => {
  const { body } = req
  try {
    const offer = await Offer.create({ ...body });

    return res.status(200).send({ message: "Success create offer", offer });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}


module.exports = { getOffers, updateOffer, createOffer, deleteOffer, getOffer }
