const express = require("express");
const passport = require('passport');

const offerService = require('../services/offerService')

const router = express.Router();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.getOffers(req, res)
);

router.put("/:offerId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.updateOffer(req, res)
);

router.delete("/:offerId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.deleteOffer(req, res)
);

router.get("/:offerId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.getOffer(req, res)
);

router.post("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => offerService.createOffer(req, res)
);

module.exports = router;
