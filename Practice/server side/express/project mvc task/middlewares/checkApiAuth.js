const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json("No token provided.");
  }

  try {
    let verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    if (verified) {
      return next();
    } else {
      return res.status(401).json("Invalid token provided.");
    }
  } catch (e) {
    return res.status(401).json(e.message);
  }
};
