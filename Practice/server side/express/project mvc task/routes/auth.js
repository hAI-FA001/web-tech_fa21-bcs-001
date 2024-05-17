const express = require("express");
let User = require("../models/User");
let bcryptjs = require("bcryptjs");
let nodemailer = require("nodemailer");

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
  if (!user) {
    req.flash(
      "danger",
      'Account not registered with email "' + req.body.email + '"'
    );
    return res.redirect("/register");
  }

  if (!user.isActivated) {
    req.flash("warning", "Please activate your account.");
    return res.redirect("/login");
  }

  if (await bcryptjs.compare(req.body.password, user.password)) {
    req.session.user = user;
    return res.redirect("/");
  } else {
    req.flash("danger", "Invalid password");
    return res.redirect("/login");
  }
});

router.get("/register", checkNotSessAuth, async (req, res, next) => {
  res.render("auth/register");
});

router.post("/register", async (req, res, next) => {
  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    req.flash(
      "warning",
      'You already have an account with email "' + req.body.email + '"'
    );
    return res.redirect("/login");
  }

  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  let salt = await bcryptjs.genSalt(10);
  let hashedPass = await bcryptjs.hash(req.body.password, salt);

  user.password = hashedPass;

  let verificationCode = await bcryptjs.hash(
    "" + Math.ceil(Math.random() * 1_000_000),
    await bcryptjs.genSalt(10)
  );
  // note/reminder: code had / inside it which messes up routes
  verificationCode = verificationCode.replace("/", "");

  user.isActivated = false;
  user.verificationCode = verificationCode;

  await user.save();

  let config = {
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);
  let message = {
    from: process.env.APP_EMAIL,
    // send to myself for now
    to: process.env.APP_EMAIL,
    subject: "<Testing Email Integration> Email verification for MyCommerce",
    // note/reminder: include http:// in link or it won't appear
    html: `<a href='http://localhost:${process.env.PORT_NUMBER}/verify/${req.body.email}/${verificationCode}'>Complete verification.</a>`,
  };

  try {
    await transporter.sendMail(message);

    req.flash(
      "info",
      "We've sent a verification link to your email to activate your account."
    );
  } catch {
    req.flash(
      "danger",
      "Unable to send verification link to your email. Please try again later."
    );
  }

  res.redirect("/login");
});

router.get("/logout", checkSessAuth, async (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
  }
  req.flash("info", "Logged out");
  res.redirect("/");
});

router.get("/verify/:email/:code", async (req, res) => {
  let email = req.params.email;
  let givenCode = req.params.code;

  let user = await User.findOne({ email }).select({
    verificationCode: 1,
    isActivated: 1,
  });

  if (givenCode == user.verificationCode) {
    user.isActivated = true;
    await user.save();

    req.flash("success", "Account has been verified.");
  } else {
    req.flash("danger", "Invalid verification code.");
  }

  res.redirect("/");
});

module.exports = router;
