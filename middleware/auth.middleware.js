const { getUser } = require("../services/service");

const checkAuth = (req, res, next) => {
  req.user = null;
  
  const token = req.cookies?.token;
  if (!token) return next();

  const user = getUser(token);
  if (!user) return next();

  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/a/login");

    if (!roles.includes(req.user.role))
      return res.status(400).json({ message: "You aren't authorized User." });

    return next();
  };
};

module.exports = {
  checkAuth,
  restrictTo,
};
