let express = require("express");
let bcryptjs = require("bcryptjs");
let checkSessAuth = require("../middlewares/checkSessAuth");
let User = require("../models/User");

let router = express.Router();

router.get("/", checkSessAuth, async (req, res) => {
  let regexFilter = {};
  if (req.session.product) {
    regexFilter = { $regex: /req.session.product/, $options: "i" };
  }

  // note/reminder: use findOne instead of fine, else myPurchases becomes [Object, Object]
  let user = await User.findOne({
    _id: req.session.user._id,
    // myPurchases: { $elemMatch: { name: regexFilter } },
  }).select({
    myPurchases: 1,
  });

  let products = user.myPurchases;

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
      let hashedPass = await bcryptjs.hash(
        req.body.newPass,
        await bcryptjs.genSalt(10)
      );
      userPassObj.password = hashedPass;
      await userPassObj.save();

      req.session.user.password = hashedPass;

      req.flash("success", "Successfully updated password");
    } else {
      req.flash("danger", "Password does not match");
    }
  } else {
    await User.find({
      _id: req.session.user._id,
    }).updateOne(req.body);

    if (req.body.name) {
      req.session.user.name = req.body.name;
    }

    if (req.body.email) {
      req.session.user.email = req.body.email;
    }

    req.flash("success", "Successfully updated details");
  }

  res.redirect("/user-profile");
});

module.exports = router;
