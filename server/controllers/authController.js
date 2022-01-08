const User = require("../models/user");
const HttpError = require("../models/httpError");

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
    if (err) {
      //  throw new Error(err);
      const error = new HttpError(
        "Fetching current users failed, please try again later.",
        500
      );
      return next(error);
    }
    res.json(user);
  });
};

// *~~~~~~~~~~GET ALL USERS~~~~~~~~~~~~~

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// *~~~~~~~~~~GETTING USER BY USER ID~~~~~~~~~~~~~~~~~

exports.getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find User",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided Id",
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};
