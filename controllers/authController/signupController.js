const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = require("../../model/userSchema");
const passwordValidation = require("../../helpers/passwordValidation");
const emailValidation = require("../../helpers/emailValidation");
const emailVerfication = require("../../helpers/emailVerification");
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
      return res.send("vai password strong hy nai");
    }
    // email r pass regex diye validate

    // duplicate email validate findOne er maddhome
    const duplicateEmail = await userSchema.findOne({ email });

    if (duplicateEmail) {
      return res.json({
        message: "Email Already Exist",
      });
    }
    // duplicate email validate findOne er maddhome

    // password hash kora
    const hash = await bcrypt.hash(password, 10);
    // password hash kora

    // otp banano and expire kora
    const otp = crypto.randomInt(100000, 999999).toString();

    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    // otp banano and expire kora

    // new user create with schema call
    const users = new userSchema({
      name,
      email,
      password: hash,
      otp: otp,
      otpExpire: otpExpire,
    });
    // new user create with schema call

    //email verification
    emailVerfication(email, otp);
    //email verification

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
    });
  }
}

module.exports = signupController;
