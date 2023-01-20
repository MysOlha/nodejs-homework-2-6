const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.required(),
  favorite: Joi.bool(),
});

const joiSchemaFavorite = Joi.object({ favorite: Joi.bool().required() });

module.exports = { joiSchema, joiSchemaFavorite };
