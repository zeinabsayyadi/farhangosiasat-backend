const ArticleModle = require("../../models/UserModel");
const _ = require("lodash");
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
    if (article)
      return res
        .status(400)
        .send({ message: "مقاله ای با این نام از این نویسنده موجود است" });
    //save content in server
    article = new ArticleModle(
      _.pick(req.body, [
        "title",
        "subtitle",
        "authorName",
        "authorSurname",
        "theme",
        "releasedate",
      ])
    );

    article = await article.save();
    res
      .header("x-access-token", token)
      .send(_.pick(article, ["title", "authourname", "_id"]));
  }
})();
