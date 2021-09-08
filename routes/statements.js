const express = require("express");
const passport = require('passport');

const statementService = require('../services/statementService')

const router = express.Router();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.getStatements(req, res)
);

module.exports = router;
