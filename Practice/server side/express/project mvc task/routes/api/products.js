const express = require("express");
const mongoose = require("mongoose");

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
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.category = req.body.category;

  await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.category = req.body.category;

  await product.save();

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  res.send(product);
});

module.exports = router;
