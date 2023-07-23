const express = require("express");
const router = express.Router();

const UserController = require("../http/controller/UserController");
const Admin = require("../http/middleware/Admin");
const Auth = require("../http/middleware/Auth");

router.post("/api/restrict/login", UserController.adminLogin);

router.post(
  "/api/restrict/loginbytoken",
  Auth,
  Admin,
  UserController.adminLoginByToken
);

router.post("/api/users/register", UserController.register);

router.post("/api/users/login", UserController.login);

router.get("/api/sendcode", UserController.sendCode);

router.post("/api/verifycode", UserController.verifyCode);

module.exports = router;
