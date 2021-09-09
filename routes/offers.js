const express = require("express");
const passport = require('passport');

const offerService = require('../services/offerService')

const router = express.Router();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.getOffers(req, res)
);

module.exports = router;
