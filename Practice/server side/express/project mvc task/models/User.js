const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verificationCode: String,
  isActivated: Boolean,

  myPurchases: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      category: String,
      imageUrl: String,
    }),
  ],
});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
