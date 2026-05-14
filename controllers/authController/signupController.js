const express = require("express");
const userSchema = require("../../model/userSchema");
const router = express.Router();

function signupController(req, res) {
  const { name, email, password } = req.body;

  if (!name) {
    return res.sent("vai name to khali!")
  }
  if (!email) {
    return res.sent("vai email to khali!")
  }
  if (!password) {
    return res.sent("vai password to khali!")
  }

  const users = new userSchema({
    
  });
  users.save();
}

module.exports = signupController;
