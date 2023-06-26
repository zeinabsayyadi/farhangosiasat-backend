const _ = require("lodash");
const ArticleModle = require("../../models/ArticleModel");
const { CreateArticleValidator } = require("../validators/ArticleValidator");
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
    if (article.length) return res.status(400).send({ message: `${article}` });
    //save content in server
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

    
    await newArticle.save();
    res
      .header("x-access-token", token)
      .send(_.pick(newArticle, ["title", "authourname", "_id"]));
  }
})();
