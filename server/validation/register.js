const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  data.username = validText(data.username) ? data.username : "";
  data.fullname = validText(data.fullname) ? data.fullname : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if(Validator.isEmpty(data.username)){
    return {message: "Username field cannot be empty"}
  }
  if (!Validator.isAlphanumeric(data.fullname)){
    return {message: "Name must contain letters", isValid: false}
  }
  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};
