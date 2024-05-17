const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verificationCode: String,
  isActivated: Boolean,
});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
