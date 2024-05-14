const express = require("express");
let User = require("../models/User");
let bcryptjs = require("bcryptjs");

let checkSessAuth = require("../middlewares/checkSessAuth");
let checkNotSessAuth = require("../middlewares/checkNotSessAuth");

let router = express.Router();

router.get("/login", checkNotSessAuth, async (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  //   note to self: req.body is undefined if express.json() is not used
  //   note to self: req.body will not have variables from POST form if express.urlencoded() is not used
  //   console.log(req.body);
  let user = await User.findOne({ email: req.body.email });

  //   note to self: need to write "return" or it will redirect but execute next code too
  if (!user) return res.redirect("/register");

  if (await bcryptjs.compare(req.body.password, user.password)) {
    req.session.user = user;
    return res.redirect("/");
  } else {
    //need to tell user password is wrong
  }
});

router.get("/register", checkNotSessAuth, async (req, res, next) => {
  res.render("auth/register");
});

router.post("/register", async (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  let salt = await bcryptjs.genSalt(10);
  let hashedPass = await bcryptjs.hash(req.body.password, salt);

  user.password = hashedPass;

  await user.save();

  res.redirect("/login");
});

router.get("/logout", checkSessAuth, async (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect("/");
});

module.exports = router;
