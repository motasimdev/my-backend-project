const express = require("express");
const router = express.Router();
const authentication = require("./auth");

// router.use("/shop", shop)
router.use("/auth", authentication);

module.exports = router;
