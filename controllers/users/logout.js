const { User } = require("../../models/users");
const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    res
      .status(401)
      .json({ status: "success", code: 401, message: "Not authorized" });
  }
  res.status(204).json({ status: "success", code: 204 });
};

module.exports = logout;
