const express = require("express");
const signupController = require("../../controllers/authController/signupController");
const {
  otpController,
  resendOtpController,
} = require("../../controllers/otpController/otpController");
const {
  loginController,
  dashboardController,
  logoutController,
} = require("../../controllers/authController/loginController");
const authMiddlewere = require("../../middlewere/authMiddlewere");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController);
router.get("/dashboard", authMiddlewere, dashboardController);

module.exports = router;
