const User = require("../models/user");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

exports.createorupdateuser = async (req, res, next) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    {
      name: name || email.split("@")[0],
      picture:
        picture ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log("UPDATED USER", user);
  } else {
    const newUser = await new User({
      email,
      name: name || email.split("@")[0],
      picture:
        picture ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    }).save();
    res.json(newUser);
    // console.log("CREATED USER", newUser);
  }
};

// *~~~~~~~~~~UPDATE USERS~~~~~~~~~~~~~

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("invalid inputs passed, please check your data", 422)
    );
  }

  const { name, picture } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
    console.log(user);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user",
      500
    );
    return next(error);
  }
  console.log(user);

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  user.name = name;
  if (picture) user.picture = picture;

  try {
    console.log("SAVING!!!");
    await user.save();
    console.log("SAVED!!!");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong while saving, could not update user",
      500
    );
    return next(error);
  }

  res.status(200).json({ updatedUser: user.toObject({ getters: true }) });
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
  User.findOne({ email: req.user.email })
    .populate("friends")
    .exec((err, user) => {
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

//  PERFORM A CHECK IF THE FRIEND IS ALREADY THERE IN MY LIST
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

    let friendExists = user.friends.filter((friend) => {
      // console.log("id found");
      console.log(friend._id, foundFriend._id);
      if (friend._id.toString() === foundFriend._id.toString()) {
        console.log("friend found");
        return true;
      }
    });

    console.log(friendExists);
    if (friendExists.length > 0) {
      const error = new HttpError("Friend Already Exists", 409);
      return next(error);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { friends: foundFriend._id } },
        { new: true }
      );
      const updatedUser2 = await User.findByIdAndUpdate(
        friendId,
        { $push: { friends: user._id } },
        { new: true }
      );

      res.json(updatedUser);
      // console.log("Friend UPDATED!!", updatedUser);
    }
  } catch (err) {
    //  throw new Error(err);
    const error = new HttpError("updating User Failed", 500);
    return next(error);
  }
};
