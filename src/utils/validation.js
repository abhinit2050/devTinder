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

const validateEditProfileData = (req) =>{

  const allowedEditFields = ["firstName", "lastName", "photoUrl", "about", "skills"];

  const isAllowedEdit = Object.keys(req.body).every(field => allowedEditFields.includes(field));

  return isAllowedEdit;
}


module.exports = {validateSignupData, validateEditProfileData};