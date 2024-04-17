const express = require("express");

let router = express.Router();

router.get("/contact-us", async (req, res) => {
  res.render("contact-us");
});

module.exports = router;
