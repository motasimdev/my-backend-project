const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
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

module.exports = mongoose.model("Category", categorySchema);
