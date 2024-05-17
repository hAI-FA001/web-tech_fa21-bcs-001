let express = require("express");
let Product = require("../models/Product");
let checkSessionAuth = require("../middlewares/checkSessAuth");

let router = express.Router();

// reminder/important: put this before /:pageNumber?, otherwise /:pageNumber? will handle /checkout
router.get("/checkout", checkSessionAuth, async (req, res) => {
  let cart = req.session.cart;
  if (!cart) {
    cart = [];
  }
  cart = await Product.find({ _id: { $in: cart } });
  res.render("products/checkout", { cart });
});

router.get("/:pageNumber?", async (req, res) => {
  let filters = {};

  if (req.session.product) {
    // i = case insensitive
    filters.name = { $regex: req.session.product, $options: "i" };
  }

  if (req.session.filters) {
    let startingPrice = req.session.filters.startingPrice;
    let endingPrice = req.session.filters.endingPrice;
    let onSale = req.session.filters.onSale;
    let rating = req.session.filters.productRating;

    if (startingPrice && endingPrice) {
      filters.price = { $gte: startingPrice, $lte: endingPrice };
    }
  }

  let pageNumber = req.params.pageNumber ? req.params.pageNumber : 1;
  pageNumber = parseInt(pageNumber);

  let numProductsToShow = 10;
  let numProductsToSkip = (pageNumber - 1) * numProductsToShow;

  let totalPages = await Product.find(filters).count();
  totalPages = Math.ceil(parseInt(totalPages) / numProductsToShow);

  products = await Product.find(filters)
    .sort({ name: 1 })
    .limit(numProductsToShow)
    .skip(numProductsToSkip);

  let cart = req.session.cart ? req.session.cart : [];

  res.render("products/products", {
    products,
    cart,
    totalPages,
    pageNumber,
  });
});

router.post("/:pageNumber?", async (req, res) => {
  // at a time, only 1 form is submitted (product name or filters)
  if (typeof req.body.product == "string") {
    req.session.product = req.body.product;
  } else if (typeof req.body != typeof undefined) {
    req.session.filters = req.body;
  }

  res.redirect("/products");
});

router.get("/addToCart/:id", checkSessionAuth, async (req, res) => {
  let cart = req.session.cart;
  if (!cart) {
    cart = [];
  }
  cart.push(req.params.id);

  req.session.cart = cart;
  req.flash("info", "Added to cart");
  res.redirect("/products");
});

router.get("/removeFromCart/:id", checkSessionAuth, async (req, res) => {
  let cart = req.session.cart;
  if (!cart) {
    cart = [];
  }
  let idx = cart.indexOf(req.params.id);
  if (idx != -1) {
    cart.splice(idx, 1);
    req.flash("info", "Removed from cart");
  }

  req.session.cart = cart;
  res.redirect("/products");
});

module.exports = router;
