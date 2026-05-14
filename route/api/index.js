const express = require("express");
const router = express.Router()
const authentication = require('./auth')
const shop = require('./shop')


router.use("/auth", authentication)
router.use("/shop", shop)
module.exports = router