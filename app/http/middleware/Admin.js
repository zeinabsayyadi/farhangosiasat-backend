const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") {
    console.log(req.user.role);
    return res.status(401).send("شما ادمین نیستید");
  }
  next();
};
