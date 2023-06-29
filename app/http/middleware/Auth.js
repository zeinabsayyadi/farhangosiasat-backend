const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-access-token");
  if (!token)
    res.status(401).send(" توکن نیست .شما اجازه دسترسی به این قسمت را ندارید");
  if (
    token ===
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5NjA0ZWU0MTY0ODhkNzgwMjg4MTQiLCJuYW1lIjoiemVpbmFiIiwic3VybmFtZSI6InNheXlhZGkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODc5MzA3MTl9.kjWeZUF9f3hyqFnbduOuievoAv_WrA6Eai6W-Jxj4zU"
  )
    console.log("equal");
  console.log("not equal");
  try {
    const user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    res
      .status(401)
      .send(`${err} ${token} شما اجازه دسترسی به این قسمت را ندارید,`);
  }
};
