const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x_access_token");
  if (!token) res.status(401).send("شما اجازه دسترسی به این قسمت را ندارید");
  try {
    const user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).send("شما اجازه دسترسی به این قسمت را ندارید", err);
  }
};
