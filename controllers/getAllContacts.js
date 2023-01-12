// const contacts = require("../models/contacts");
const Contact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });

  // try {
  //   const allContacts = await contacts.listContacts();
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       result: allContacts,
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = getAllContacts;
