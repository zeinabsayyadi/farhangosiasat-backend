const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const phonePatern = "/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/";
const passwordPatern =
  "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/";

const adminLoginValidator = (data) => {
  const schema = Joi.object({
    phone: Joi.number().required(),
    password: Joi.string().required(),
    //verifyCode: Joi.number().integer().required(),
  });
  return schema.validate(data);
};
const loginValidator = (data) => {
  const schema = Joi.object({
    phone: Joi.number().required(),
    //verifyCode: Joi.string().required(),
  });
  return schema.validate(data);
};
const registorValidator = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    isStudent: Joi.boolean().default(false),
  });
  return schema.validate(data);
};

module.exports = { registorValidator, loginValidator, adminLoginValidator };
