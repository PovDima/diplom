const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");
const error = require("../middleware/error");

router.use("/users", users);
router.use("/auth", auth);
router.use(error);

module.exports = router;
