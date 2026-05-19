const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpire: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  roll: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

module.exports = mongoose.model("User", userSchema);
