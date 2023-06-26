const express = require("express");
const router = express.Router();

const ArticleController = require("../http/controller/ArticleController");
const Auth = require("../http/middleware/Auth");
const Admin = require("../http/middleware/Admin");

router.post(
  "/api/retrict/dashboard/create-article",
  Auth,
  Admin,
  ArticleController.createArticle
);

module.exports = router;
