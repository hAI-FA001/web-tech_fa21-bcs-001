let express = require("express");
let bcryptjs = require("bcryptjs");
let checkSessAuth = require("../middlewares/checkSessAuth");
let User = require("../models/User");

let router = express.Router();

router.get("/", checkSessAuth, async (req, res) => {
  let products = [];

  let filters = {};
  if (req.session.product) {
    filters.name = { $regex: /req.session.product/, $options: "i" };
  }

  res.render("user-profile.ejs", {
    user: req.session.user,
    products,
  });
});

router.post("/", async (req, res) => {
  if (req.body.product) {
    req.session.product = req.body;
  } else if (req.body.oldPass) {
    // note/reminder: this returns password inside an obj, not password as string
    let userPassObj = await User.findOne({ _id: req.session.user._id }).select({
      password: 1,
    });

    // note/reminder: don't forget "await" for bcryptjs functions, else illegal arguments error
    if (await bcryptjs.compare(req.body.oldPass, userPassObj.password)) {
      userPassObj.password = await bcryptjs.hash(
        req.body.newPass,
        await bcryptjs.genSalt(10)
      );
      await userPassObj.save();
    }
  } else {
    await User.find({
      _id: req.session.user._id,
    }).updateOne(req.body);
  }

  res.redirect("/user-profile");
});

module.exports = router;
