const { User } = require("../../models/users");
const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne(email);
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
    return;
  }
  if (user.verify) {
    res.status(400).json({
      status: "error",
      code: 404,
      message: "User already verify",
    });
    return;
  }
  const mail = {
    to: email,
    subject: "User verification by email",
    html: `<a href = "http://localhost3000/api/users/verify/:${user.verificationToken}" target="_blank">Press for verification your email :) </a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = resendVerifyEmail;
