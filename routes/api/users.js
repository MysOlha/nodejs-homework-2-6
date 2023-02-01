const express = require("express");

const {
  register,
  login,
  getCurrentUser,
  logout,
  updAvatar,
  verifyEmail,
  resendVerifyEmail
} = require("../../controllers/users/index");

const auth = require("../../midddlewars/auth");
const upload = require("../../midddlewars//upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, getCurrentUser);
router.post("/logout", auth, logout);
router.patch("/avatars", auth, upload.single("avatar"), updAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerifyEmail);

module.exports = router;
