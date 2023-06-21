const express = require("express");
const router = express.Router();

const UserController = require("../http/controller/UserController");

router.post("/api/retrict/login", UserController.adminLogin);

router.post("/api/users/register", UserController.register);

router.post("/api/users/login", UserController.login);

router.get("/api/sendcode", UserController.sendCode);

router.post("/api/verifycode", UserController.verifyCode);

module.exports = router;
