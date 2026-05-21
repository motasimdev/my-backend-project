const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    reference: "Category"
},
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
