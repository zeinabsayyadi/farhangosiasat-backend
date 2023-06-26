const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const dateJoi = Joi.extend(require("@joi/date"));
// no data needed so no validation needed!
// const readArticle = (data) => {
//   const schema = Joi.object({

//   });
//   return schema.validate(data);
// };
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
    releasedate: dateJoi.date().format("YYYY-MM-DD").required(),
    coverimagelink: Joi.string().required(),
    contentlink: Joi.string().required(),
  });
  return schema.validate(data);
};
const registorValidator = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    // phone: Joi.string()
    //   .pattern(
    //     new RegExp("^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$")
    //   )
    //   .required(),
    email: Joi.string().email().required(),
    isStudent: Joi.boolean().default(false),
  });
  return schema.validate(data);
};

module.exports = { CreateArticleValidator };
