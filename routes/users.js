const express = require("express");
const passport = require('passport');

const router = express.Router();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = (req.user) || null;
    await res.status(200).send({ message: "User info successfully retreived", user });
  });

module.exports = router;
