let express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
  res.render("about-us");
});

module.exports = router;
