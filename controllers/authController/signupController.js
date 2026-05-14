const express = require("express");
const userSchema = require("../../model/userSchema");
const passwordValidation = require("../../helpers/passwordValidation");
const emailValidation = require("../../helpers/emailValidation");
const router = express.Router();

async function signupController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.send("vai name to khali!");
    }
    if (!email) {
      return res.send("vai email to khali!");
    }
    if (!emailValidation(email)) {
      return res.send("vai valid email den!");
    }
    if (!password) {
      return res.send("vai password to khali!");
    }
    if (!passwordValidation(password)) {
      return res.send("vai password valid hy nai");
    }

    const users = new userSchema({
      name,
      email,
      password,
    });
    await users.save();
    res.status(201).json({
      message: "অ্যাকাউন্ট তৈরি সফল হয়েছে!",
      data: users,
    });
  } catch (error) {
    // ৭. কোনো এরর হলে (যেমন ডুপ্লিকেট ইমেইল) সেটা হ্যান্ডেল করা
    res.status(500).json({
      error: "সার্ভারে সমস্যা হয়েছে!",
      details: error.message,
      success: true,
      message: "User created",
      data: user,
    });
  }
}

module.exports = signupController;
