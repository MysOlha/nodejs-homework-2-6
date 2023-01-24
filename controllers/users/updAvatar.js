const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsFolder = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const image = await Jimp.read(tmpUpload);

  await image
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
    .writeAsync(tmpUpload);

  try {
    const result = path.join(avatarsFolder, `${id}_${originalname}`);
    await fs.rename(tmpUpload, result);
    const avatarURL = path.join("public", "avatars", `${id}_${originalname}`);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    res.status(401).json({
      status: "error",
      code: 400,
      message: "Not authorized",
    });
  }
};

module.exports = updAvatar;
