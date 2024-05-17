const mongoose = require("mongoose");

let productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    category: String,

    rating: Number,
    totalRatings: Number,
    imageUrl: String,
    discount: Number,
    dateAdded: Date,
  },
  // note/reminder: add this otherwise mongoose will not add virtuals when it converts document to JSON
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// note/reminder: don't use arrow functions because "this" keyword won't work
productSchema.virtual("isOutOfStock").get(function () {
  return this.stock == 0;
});
productSchema.virtual("isTopRated").get(function () {
  return this.rating >= 4.5 && this.totalRatings > 10;
});
productSchema.virtual("isOnSale").get(function () {
  return this.discount > 0;
});
productSchema.virtual("isTrending").get(function () {
  let today = new Date();
  let prevWeek = new Date();
  prevWeek.setDate(today.getDate() - 7);
  return this.isTopRated && today - this.dateAdded <= today - prevWeek;
});

let productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
