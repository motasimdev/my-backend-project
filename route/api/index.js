const express = require("express");
const router = express.Router()
const authentication = require('./auth')
const shop = require('./shop');
const otpController = require("../../controllers/otpController/otpController");


// router.use("/shop", shop)
router.use("/auth", authentication)
router.use("/otpverify", otpController)
module.exports = router