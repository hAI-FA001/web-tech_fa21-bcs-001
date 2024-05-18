const express = require("express");

let checkApiAuth = require("../../middlewares/checkApiAuth");
let checkAdmin = require("../../middlewares/checkAdmin");

let Product = require("../../models/Product");

let router = express.Router();

router.use(checkApiAuth);

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.send(product);
});

router.post("/", checkAdmin, async (req, res) => {
  let product = new Product(req.body);

  await product.save();

  res.send(product);
});

router.put("/:id", checkAdmin, async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(product);
});

router.delete("/:id", checkAdmin, async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  res.send(product);
});

module.exports = router;
