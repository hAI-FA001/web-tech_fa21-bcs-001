const express = require("express");
let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
let User = require("../../models/User");

let router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json("No credentials provided.");
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json("User not found.");
  }

  if (!user.isActivated) {
    return res.status(401).json("Account not activated.");
  }

  if (await bcryptjs.compare(req.body.password, user.password)) {
    // note/reminder: don't put user directly in sign() or it contains mongoose related info
    let token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isActivated: user.isActivated,
        verificationCode: user.verificationCode,
        myPurchases: user.myPurchases,
        roles: user.roles,
      },
      process.env.JWT_PRIVATE_KEY
    );

    return res.status(200).send(token);
  } else {
    return res.status(401).json("Invalid credentials.");
  }
});

module.exports = router;
