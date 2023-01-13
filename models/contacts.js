const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.required(),
  favorite: Joi.bool(),
});

const joiSchemaFavorite = Joi.object({ favorite: Joi.bool().required() });

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, joiSchemaFavorite };
