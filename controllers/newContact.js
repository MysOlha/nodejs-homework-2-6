const { Contact } = require("../models/contacts");
const { joiSchema } = require("../schemas/joiContacts");

const newContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
      return;
    }
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newContact;
