const express = require("express");
const router = express.Router();
const adminCheck = require('../middleware/admin')
const passport = require('passport');
const authService = require('../services/authService')

router.post("/login", async (req, res) => authService.login(req, res));
router.post("/login/forgot", async (req, res) => authService.forgot(req, res));
router.post("/login/reset/:token", async (req, res) => authService.reset(req, res))
router.post("/logout", (req, res) => res.status(200).send({ message: "Logout success" }));
router.post("/confirmation/:token", async (req, res) => authService.confirmation(req, res));
router.post(
  "/resend",
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  async (req, res) => authService.resend(req, res));
router.post(
  "/register/reset",
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  async (req, res) => authService.registerReset(req, res));
router.post(
  "/register",
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  async (req, res) => authService.register(req, res)
)

module.exports = router;
