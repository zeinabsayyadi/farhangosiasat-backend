const _ = require("lodash");
const path = require("path");
const ArticleModle = require("../../models/ArticleModel");
const { CreateArticleValidator } = require("../validators/ArticleValidator");
const fs = require("fs");
module.exports = new (class ArticleController {
  //need admin middleware
  async createArticle(req, res) {
    const { error } = CreateArticleValidator(req.body);
    if (error) return res.status(400).send({ message: error.message });
    let article = await ArticleModle.find({
      title: req.body.title,
      authorName: req.body.authorName,
      authorSurname: req.body.authorSurname,
    });
    if (article.length)
      return res
        .status(400)
        .send({ message: "مقاله ای با این نام از این نویسنده موجود است" });
    // save content in server
    const coverimagelink = [
      req.files?.articleImageTop[0]?.path,
      req.files?.articleImageMiddle[0]?.path,
      req.files?.articleImageEnd[0]?.path,
    ];

    const contentlink = req.files?.articleContent[0]?.path;
    const newArticle = new ArticleModle(
      _.pick(req.body, [
        "title",
        "subtitle",
        "authorName",
        "authorSurname",
        "theme",
        "releasedate",
      ])
    );

    (newArticle.coverimagelink = coverimagelink),
      (newArticle.contentlink = contentlink);
    await newArticle.save();
    res.send(_.pick(newArticle, ["title", "authourName", "_id"]));
  }

  async readPaginatedArticles(req, res) {
    // const { startIndex, endIndex, limit } = req?.pagination;
    const articles = await ArticleModle.find();
    res.send({ articles });
  }

  async readOneArticleById(req, res) {
    const id = req.params.id;
    let article = await ArticleModle.findById(id);
    console.log(article);
    res.send(article);
  }

  async readArticleContent(req, res, next) {
    const contentSrc = req.params.conentlink;
    const src = fs.createReadStream(contentSrc);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=sample.pdf",
      "Content-Transfer-Encoding": "Binary",
    });
    src.pipe(res);
  }
})();
