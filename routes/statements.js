const express = require("express");
const passport = require('passport');

const statementService = require('../services/statementService')

const router = express.Router();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.getStatements(req, res)
);

router.post("/algorithm",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.startAlgorithm(req, res)
);

router.put("/:statementId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.updateStatement(req, res)
);

router.delete("/:statementId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.deleteStatement(req, res)
);

router.get("/:statementId",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.getStatement(req, res)
);

router.post("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => statementService.createStatement(req, res)
);


module.exports = router;
