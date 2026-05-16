const userSchema = require("../../model/userSchema");

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


module.exports  = otpController