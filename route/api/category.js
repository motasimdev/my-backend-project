const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/productController/categoryController");

router.post("/category", categoryController);

module.exports = router;
