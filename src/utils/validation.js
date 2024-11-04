const validator = require("validator");

const validateSignupData = (data) => {
  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName) {
    throw new Error("Invalid name or name not present!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Your password is not strong enough!");
  }
};


module.exports = validateSignupData;