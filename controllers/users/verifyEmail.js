const { User } = require("../../models/users");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found verificationToken",
    });
    return;
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};
module.exports = verifyEmail;
