const express = require("express");
const passport = require('passport');
const multipart = require('connect-multiparty');

const fileService = require('../services/fileService')

const router = express.Router();

router.post("/import/:type",
  multipart(),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => fileService.importFile(req, res)
)

module.exports = router;
