const express = require("express");
const router = express.Router();
const {categoryController, getAllCategory} = require("../../controllers/productController/categoryController");
const  subCategoryController  = require("../../controllers/productController/subCategoryController");

router.post("/createcategory", categoryController);
router.get("/getallcategory", getAllCategory);
router.post("/createsubcategory", subCategoryController);

module.exports = router;
