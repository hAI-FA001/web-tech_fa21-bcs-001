const express = require("express");

let Product = require("../../models/Product");

let router = express.Router();

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.send(product);
});

router.post("/", async (req, res) => {
  let product = new Product(req.body);

  await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  res.send(product);
});

module.exports = router;
