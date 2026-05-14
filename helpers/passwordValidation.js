function passwordValidation(params) {
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; 
    passRegex.test()
}

module.exports = passwordValidation;
