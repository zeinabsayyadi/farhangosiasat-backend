const express = require("express");
const router = express.Router();

const ArticleController = require("../http/controller/ArticleController");
const Auth = require("../http/middleware/Auth");
const Admin = require("../http/middleware/Admin");
const FileUploding = require("../http/middleware/ArticleFileUploading");
const paginationMiddleware = require("../http/middleware/Pagination");

router.post(
  "/api/restrict/dashboard/create-article",
  Auth,
  Admin,
  FileUploding,
  ArticleController.createArticle
);

//get one artilce
router.get(
  "/guest/articles/onearticle/:id",
  ArticleController.readOneArticleById
);

//get all articles in pagination
router.get("/guest/artilces", ArticleController.readPaginatedArticles);
module.exports = router;
