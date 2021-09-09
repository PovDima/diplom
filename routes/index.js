const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");
const files = require("./files");
const offers = require("./offers");
const statements = require("./statements");
const error = require("../middleware/error");

router.use("/users", users);
router.use("/files", files);
router.use("/offers", offers);
router.use("/statements", statements);
router.use("/auth", auth);
router.use(error);

module.exports = router;
