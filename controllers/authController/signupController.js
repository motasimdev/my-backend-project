const express = require("express");
const userSchema = require("../../model/userSchema");
const passwordValidation = require("../../helpers/passwordValidation");
const router = express.Router();

function signupController(req, res) {
  const { name, email, password } = req.body;

  if (!name) {
    return res.sent("vai name to khali!");
  }
  if (!email) {
    return res.sent("vai email to khali!");
  }
  if (!password) {
    return res.sent("vai password to khali!");
  }
  if (!passwordValidation) {
    return res.sent("vai password valid hy nai");
  }

  const users = new userSchema({
    name,
    email,
    password,
  });
  users.save();
  res.json({
    data: users
  })
}

module.exports = signupController;
