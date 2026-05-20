const categorySchema = require("../../model/categorySchema");

async function categoryController(req, res) {
  try {
    const { name, description } = req.body;

    // khali field validate
    if (!name) {
      return res.json({
        error: "vai name field khali",
      });
    }
    // khali field validate

    const existingName = await categorySchema.findOne({ name });

    //existing title validate
    if (existingName) {
      return res.json({
        error: "vai ei name to ekbar disen",
      });
    }
    //existing title validate

    const createCategory = categorySchema({
      name,
      description,
    });
    await createCategory.save();

    res.status(200).json({
      message: "add category",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

// ============ get all category list ======================
async function getAllCategory(req, res) {
  const allCategoryList = await categorySchema.find({});
  res.json({
    message: "All Category",
    data: allCategoryList,
  });
}
// ============ get all category list ======================

module.exports = { categoryController, getAllCategory };
