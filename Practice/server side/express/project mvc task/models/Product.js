const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: String,
});

let productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
