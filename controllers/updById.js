const { Contact, joiSchema } = require("../models/contacts");

const updById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const { contactId } = req.params;
    const changeContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: changeContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updById;
