const subCategorySchema = require("../../model/subCategorySchema");
const CategorySchema = require("../../model/categorySchema");

async function subCategoryController(req, res) {
  try {
    const { name, description, categoryId } = req.body;

    // khali field validate
    if (!name) {
      return res.json({
        error: "vai name field khali",
      });
    }
    // khali field validate

    const existingName = await subCategorySchema.findOne({ name });

    //existing name validate
    if (existingName) {
      return res.json({
        error: "vai ei name to ekbar disen",
      });
    }
    //existing name validate

    const createSubCategory = subCategorySchema({
      name,
      description,
      categoryId,
    });
    await createSubCategory.save();

    // add subcategory in category
    await CategorySchema.findOneAndUpdate({ categoryId }, { $push: { subcategorylist: categoryId} });
    // add subcategory in category

    res.status(200).json({
      message: "add sub category",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

// ============ get all category list ======================
// async function getAllCategory(req, res) {
//   const allCategoryList = await categorySchema.find({});
//   res.json({
//     message: "All Category",
//     data: allCategoryList,
//   });
// }
// ============ get all category list ======================

module.exports = subCategoryController;
