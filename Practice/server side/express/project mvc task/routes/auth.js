const express = require("express");
let User = require("../models/User");

let router = express.Router();

router.get("/login", async (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  //   note to self: req.body is undefined if express.json() is not used
  //   note to self: req.body will not have variables from POST form if express.urlencoded() is not used
  //   console.log(req.body);
  let user = await User.findOne({ email: req.body.email });

  //   note to self: need to write "return" or it will redirect but execute next code too
  if (!user) return res.redirect("/register");
  if (user.password == req.body.password) {
    req.session.user = user;
    return res.redirect("/");
  } else {
    //need to tell user password is wrong
  }
});

router.get("/register", async (req, res, next) => {
  res.render("auth/register");
});

router.post("/register", async (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  await user.save();

  res.redirect("/login");
});

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect("/");
});

module.exports = router;
