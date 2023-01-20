const { User } = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
    });
    return;
  }

  const authPass = bcrypt.compareSync(password, user.password);
  if (!authPass) {
    res.status(401).json({
      ResponseBody: {
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      },
    });
    return;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
