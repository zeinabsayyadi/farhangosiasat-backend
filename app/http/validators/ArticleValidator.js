const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const CreateArticleValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    authorName: Joi.string().min(3).required(),
    authorSurname: Joi.string().min(3).required(),
    theme: Joi.array().items(
      Joi.string()
        .valid(
          "فرهنگی",
          "سیاسی",
          "اقتصادی",
          "اجتماعی",
          "هنری",
          "زنان",
          "محیط زیست"
        )
        .required()
    ),
    releasedate: Joi.date(),
    coverimagelink: Joi.string(),
    contentlink: Joi.string(),
  });
  return schema.validate(data);
};


module.exports = { CreateArticleValidator };
