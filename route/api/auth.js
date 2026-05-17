const express = require("express");
const signupController = require("../../controllers/authController/signupController");
const {
  otpController,
  resendOtpController,
} = require("../../controllers/otpController/otpController");
const loginController = require("../../controllers/authController/loginController");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController);

module.exports = router;
