const express = require("express");

const {
  getAllContacts,
  getById,
  removeById,
  newContact,
  updById,
  updateStatusContact,
} = require("../../controllers/index");

const auth = require("../../midddlewars/auth");

const router = express.Router();

router.get("/", auth, getAllContacts);

router.get("/:contactId", getById);

router.post("/", auth, newContact);

router.delete("/:contactId", removeById);

router.put("/:contactId", updById);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
