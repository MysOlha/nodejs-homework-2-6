const { User } = require("../../models/users");
const gravatar = require("gravatar");
const {joiSchemaUsers} = require("../../schemas/joiUsers");
const bcrypt = require("bcrypt");
const sendEmail = require("../../helpers/sendEmail");
const { v4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const users = await User.findOne({ email });
    if (users) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
      return;
    }

    const { error } = joiSchemaUsers.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
      return;
    }

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    await User.create({
      email,
      password: hashPass,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "User verification by email",
      html: `<a href = "http://localhost3000/api/users/verify/:${verificationToken}" target="_blank">Press for verification your email :) </a>`,
    };

    await sendEmail(mail);
    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
