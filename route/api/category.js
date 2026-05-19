const express = require("express");
const router = express.Router();
const {categoryController, getAllCategory} = require("../../controllers/productController/categoryController");

router.post("/category", categoryController);
router.get("/getAllCategory", getAllCategory);

module.exports = router;
