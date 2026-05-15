const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../../model/userSchema");
const passwordValidation = require("../../helpers/passwordValidation");
const emailValidation = require("../../helpers/emailValidation");
const router = express.Router();

async function signupController(req, res) {
  try {
    // req.body er vitore frontend er data eshe dhukhe.. fieldgulo ekhane eivabe ber krte hy
    const { name, email, password } = req.body;

    // aladavabe field gulo khali rakhar error
    if (!name) {
      return res.send("vai name to khali!");
    }
    if (!email) {
      return res.send("vai email to khali!");
      // aladavabe field gulo khali rakhar error
    }
    if (!password) {
      return res.send("vai password to khali!");
    }
    // aladavabe field gulo khali rakhar error

    // email r pass regex diye validate 
    if (!emailValidation(email)) {
      return res.send("vai valid email den!");
    }
    if (!passwordValidation(password)) {
      return res.send("vai password valid hy nai");
    }
    // email r pass regex diye validate 

    // duplicate email validate kora
    const duplicateEmail = await userSchema.find({ email });
    
    if (duplicateEmail.length > 0) {
      return res.json({
        messege: "Email Already Exist"
      })
    }
    // duplicate email validate kora

    // password hash kora
    const hash = await bcrypt.hash(password, 10);
    const users = new userSchema({
      name,
      email,
      password: hash,
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
      data: users,
    });
  }
}

module.exports = signupController;
