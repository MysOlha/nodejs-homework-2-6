const express = require("express");

const {
  register,
  login,
  getCurrentUser,
  logout,
  updAvatar
} = require("../../controllers/users/index");

const auth = require("../../midddlewars/auth");
const upload = require("../../midddlewars//upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, getCurrentUser);
router.post("/logout", auth, logout);
router.patch("/avatars", auth, upload.single("avatar"), updAvatar);

module.exports = router;
