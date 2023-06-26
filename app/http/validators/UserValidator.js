const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const adminLoginValidator = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(
        new RegExp("^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$")
      )
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")
      )
      .required(),
    //verifyCode: Joi.number().integer().required(),
  });
  return schema.validate(data);
};
const loginValidator = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(
        new RegExp("^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$")
      )
      .required(),
    //verifyCode: Joi.string().required(),
  });
  return schema.validate(data);
};
const registorValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(3).max(30).required(),
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

module.exports = { registorValidator, loginValidator, adminLoginValidator };
