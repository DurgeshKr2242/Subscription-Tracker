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
    // console.log("CREATED USER", newUser);
  }
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

//* ~~~~~~~~~~~~ CURRENT USER ~~~~~~~~~~~~

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

//* ~~~~~~~~~~~~ ADD FRIEND ~~~~~~~~~~~~

// TODO PERFORM A CHECK IF THE FRIEND IS ALREADY THERE IN MY LIST
// Include Auth Middleware in routes
exports.addFriend = async (req, res, next) => {
  const friendId = req.params.fid;
  let foundFriend;
  try {
    foundFriend = await User.findById(friendId);
  } catch (err) {
    const error = new HttpError("Can't find friend of the mentioned Id", 500);
    return next(error);
  }

  try {
    let user = await User.findOne({ email: req.user.email });

    // let friendExists = user.friends.filter((friend) => {
    //   // console.log("id found");
    //   console.log(friend._id, foundFriend._id);
    //   if (friend._id === foundFriend._id) return true;
    // });

    // console.log(friendExists);
    // if (friendExists.length > 0) {
    //   const error = new HttpError("Friend Already Exists", 409);
    //   return next(error);
    // } else {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { friends: foundFriend } },
      { new: true }
    );

    res.json(updatedUser);
    // console.log("Friend UPDATED!!", updatedUser);
    // }
  } catch (err) {
    //  throw new Error(err);
    const error = new HttpError("updating User Failed", 500);
    return next(error);
  }
};
