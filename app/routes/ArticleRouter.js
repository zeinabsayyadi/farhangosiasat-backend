const express = require("express");
const router = express.Router();
const path = require("path");
const ArticleController = require("../http/controller/ArticleController");
const Auth = require("../http/middleware/Auth");
const Admin = require("../http/middleware/Admin");
const FileUploding = require("../http/middleware/ArticleFileUploading");
const paginationMiddleware = require("../http/middleware/Pagination");
const { default: rootPath } = require("get-root-path");

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

//get article content
router.get("/guest/article/:contentlink", ArticleController.readArticleContent);

router.get("/api/pdf", (req, res) => {
  console.log("meaooo: ", rootPath);
  const pdfFilePath = path.join(
    rootPath,
    "uploadedFiles/article/contents",
    "articleContent1688973583056.pdf"
  );
  res.sendFile(pdfFilePath, (err) => {
    if (err) {
      // Handle errors
      res.status(500).send("Error sending PDF");
    }
  });
});
module.exports = router;
