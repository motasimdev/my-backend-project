const passRegex = /^\S+@\S+\.\S+$/;
function emailValidation(email) {
  return passRegex.test(email);
}

module.exports = emailValidation;
