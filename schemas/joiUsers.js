const Joi = require("joi");

const joiSchemaUsers = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().required(),
});

module.exports = joiSchemaUsers;
