const express = require("express");

const {
  register,
  login,
  getCurrentUser,
  logout
} = require("../../controllers/users/index");

const auth = require("../../midddlewars/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, getCurrentUser);
router.post("/logout", auth, logout);

module.exports = router;
