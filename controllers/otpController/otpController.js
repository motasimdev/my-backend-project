const userSchema = require("../../model/userSchema");
const crypto = require("crypto");

async function otpController(req, res) {
  const { email, otp } = req.body;

  const user = await userSchema.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  if (user.isVerified) {
    return res.json({
      message: "User Is Verified",
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  if (user.otpExpire < Date.now()) {
    return res.status(400).json({
      message: "OTP Expired",
    });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  res.status(200).json({
    message: "Email Verification Done",
  });
}
async function resendOtpController(req, res) {
  const { email } = req.body;

  const resendOtp = await userSchema.findOne({ email });
  if (!resendOtp) {
    return res.json({
      message: "email not found",
    });
  }
  // otp banano and expire kora
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpire = new Date(Date.now() + 10 * 60 * 1000);
  // otp banano and expire kora

  resendOtp.otp = otp;
  resendOtp.otpExpire = otpExpire;

  await resendOtp.save();

  res.status(200).json({
    message: "Resend OTP Success",
  });
}

module.exports = { otpController, resendOtpController };
