const categorySchema = require("../../model/categorySchema");

async function categoryController(req, res) {
  try {
    const { title, description } = req.body;

    // khali field validate
    if (!title) {
      return res.json({
        error: "vai title field khali",
      });
    }
    // khali field validate

    const existingTitle = await categorySchema.findOne({ title });

    //existing title validate
    if (existingTitle) {
      return res.json({
        error: "vai ei title to ekbar disen",
      });
    }
    //existing title validate

    const createCategory = categorySchema({
      title,
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

async function getAllCategory(req, res) {
    const allCategoryList = await categorySchema.find({})
}
module.exports = categoryController;
