const { Contact } = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
