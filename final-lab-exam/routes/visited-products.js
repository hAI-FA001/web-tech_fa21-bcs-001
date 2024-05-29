// lab exam

const express = require("express");
const Product = require("../models/Product");

let router = express.Router();

router.get("/", async (req, res) => {
  let visitedProducts = await Product.find({
    _id: { $in: req.session.visitedProducts },
  });

  res.render("visited-products", { visitedProducts });
});

module.exports = router;
