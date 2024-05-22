module.exports = async (req, res, next) => {
  res.locals.expressFlash = req.flash();
  res.locals.user = req.session.user;

  next();
};
