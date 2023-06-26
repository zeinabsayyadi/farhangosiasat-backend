const express = require("express");
const router = express.Router();

const ArticleController = require("../http/controller/ArticleController");
const Auth = require("../http/middleware/Auth");
const Admin = require("../http/middleware/Admin");
const FileUploding = require("../http/middleware/ArticleFileUploading");

router.post(
  "/api/retrict/dashboard/create-article",
  Auth,
  Admin,
  FileUploding,
  ArticleController.createArticle
);

module.exports = router;
