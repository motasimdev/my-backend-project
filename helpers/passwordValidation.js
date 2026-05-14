// const validator = require('validator');

// const passwordValidation = (password) => {
//     return validator.isStrongPassword(password, {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1
//     });
// }



const passRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
function passwordValidation(password) {
  return passRegex.test(password);
}

module.exports = passwordValidation;
