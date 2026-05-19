const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/productController/categoryController");

router.get("/category", categoryController);

module.exports = router;
