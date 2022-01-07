const User = require("../models/user");
exports.createorupdateuser = async (req, res, next) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: user.email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATED USER", user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
    console.log("CREATED USER", newUser);
  }
};
