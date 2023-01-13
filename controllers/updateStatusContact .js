const { Contact, joiSchemaFavorite } = require("../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiSchemaFavorite.validate(req.body);

    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }

    const { contactId } = req.params;
    const { favorite } = req.body;

    const changeContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
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

module.exports = updateStatusContact;
