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
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
