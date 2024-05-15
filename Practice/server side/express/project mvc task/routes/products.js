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
  res.render("checkout", { cart });
});

router.get("/:pageNumber?", async (req, res) => {
  let pageNumber = req.params.pageNumber ? req.params.pageNumber : 1;
  pageNumber = parseInt(pageNumber);

  let totalPages = await Product.countDocuments();
  totalPages = parseInt(totalPages);

  let numberToShow = 10;
  let skip = (pageNumber - 1) * numberToShow;

  let products = await Product.find().limit(numberToShow).skip(skip);

  if (req.session.filters) {
    let productName = req.session.product;

    let startingPrice = req.session.filters.startingPrice;
    let endingPrice = req.session.filters.endingPrice;
    let onSale = req.session.filters.onSale;
    let rating = req.session.filters.productRating;

    if (productName) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(productName.toLowerCase())
      );
    }

    if (startingPrice && endingPrice) {
      products = products.filter(
        (p) => p.price >= startingPrice && p.price <= endingPrice
      );
    }
  }

  let cart = req.session.cart ? req.session.cart : [];

  res.render("products", {
    products,
    cart,
    totalPages,
    pageNumber,
  });
});

router.post("/:pageNumber?", async (req, res) => {
  if (typeof req.body.product == "string") {
    req.session.product = req.body.product;
  } else if (typeof req.body != typeof undefined) {
    req.session.filters = req.body;
  }

  res.redirect(
    "/products/" + (req.params?.pageNumber ? req.params.pageNumber : 1)
  );
});

router.get("/addToCart/:id", checkSessionAuth, async (req, res) => {
  let cart = req.session.cart;
  if (!cart) {
    cart = [];
  }
  cart.push(req.params.id);

  req.session.cart = cart;
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
  }

  req.session.cart = cart;
  res.redirect("/products");
});

module.exports = router;
