const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  let verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  if (verified.roles.includes("admin")) {
    return next();
  } else {
    return res.status(403).json("Not allowed to perform operation.");
  }
};
