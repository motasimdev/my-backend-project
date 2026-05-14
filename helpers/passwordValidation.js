function passwordValidation(email) {
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; 
    passRegex.test(email)
}

module.exports = passwordValidation;
