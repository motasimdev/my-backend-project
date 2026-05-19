const emailValidation = require("../../helpers/emailValidation");
const bcrypt = require("bcrypt");
const userSchema = require("../../model/userSchema");

async function loginController(req, res) {
  const { email, password } = req.body;

  // field khali rakhar validation
  if (!email) {
    return res.json({
      error: "vai email den",
    });
  }
  if (!password) {
    return res.json({
      error: "vai password den",
    });
  }
  // field khali rakhar validation

  // email format regex diye validate
  if (!emailValidation(email)) {
    return res.json({
      error: "Invalid Email Format",
    });
  }
  // email format regex diye validate

  const duplicateUser = await userSchema.findOne({ email });

  // email diye signup hoise ki na sheta check - eta 1st e rakhte hbe nahle server crash krbe
  if (!duplicateUser) {
    return res.json({
      error: "Email Not Found",
    });
  }
  // email diye signup hoise ki na sheta check - eta 1st e rakhte hbe nahle server crash krbe

  // email diye signup krar por verify hoise ki na sheta check
  if (!duplicateUser.isVerified) {
    return res.json({
      error: "User is Not Verified",
    });
  }
  // email diye signup krar por verify hoise ki na sheta check

  // password hash baniye erpr compare kora
  const isMatch = await bcrypt.compare(password, duplicateUser.password);

  if (!isMatch) {
    return res.json({
      error: "Password Wrong",
    });
  }
  // password hash compare kora

  //session
  // console.log(req.session)
  req.session.isAuth = true;
  req.session.duplicateUser = {
    id: duplicateUser.id,
    name: duplicateUser.name,
    email: duplicateUser.email,
  };
  //session

  res.json({
    message: "login Success",
  });
}

//==================dashboard function==============
function dashboardController(req, res) {
  return res.json({
    message: "this is dashboard",
  });
}
//==================dashboard function==============

//=================logout function=====================
function logoutController(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.json({
        err: "Something Wrong",
      });
    } else {
      return res.json({
        message: "Logout Successful",
      });
    }
  });
}
//=================logout function=====================

module.exports = { loginController, dashboardController, logoutController };
