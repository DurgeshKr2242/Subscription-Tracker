const User = require("../models/user");

exports.createorupdateuser = async (req, res, next) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: name || email.split("@")[0], picture: picture },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATED USER", user);
  } else {
    const newUser = await new User({
      email,
      name: name || email.split("@")[0],
      picture: picture,
    }).save();
    res.json(newUser);
    console.log("CREATED USER", newUser);
  }
};

exports.currentUser = async (req, res, next) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
