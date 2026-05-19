const express = require("express");
const router = express.Router();
const authentication = require("./auth");
const product = require("./category");

// router.use("/shop", shop)
router.use("/auth", authentication);
router.use("/product", product);

module.exports = router;
