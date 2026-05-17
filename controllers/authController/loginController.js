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

  // password hash kora
  const hash = await bcrypt.hash(password, 10);
  // password hash kora

  const duplicateUser = await userSchema.findOne({ email });

  if (!duplicateUser) {
    return res.json({
      error: "Email Not Found",
    });
  }

  //   if (hash !== duplicateUser.password) {
  //     return res.json({
  //       error: "Password Wrong",
  //     });
  //   }

  res.send("Done");
}

module.exports = loginController;
