const { validationResult } = require("express-validator");
// const mongoose = require("mongoose");
const HttpError = require("../models/httpError");

const Post = require("../models/post");
const User = require("../models/user");

// *~~~~~~~~~~GETTING ALL THE POSTS~~~~~~~~~~~~~~~~~

exports.getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({});
  } catch (err) {
    const error = new HttpError("Fettching Posts Faild, Try Again Later", 500);
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

// *~~~~~~~~~~GETTING ALL THE POSTS BY USER ID~~~~~~~~~~~~~~~~~

exports.getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userPosts;
  try {
    userPosts = await Post.find({ creatorId: userId });
    console.log(userPosts);
  } catch (err) {
    const error = new HttpError("Fettching Posts Faild, Try Again Later", 500);
    return next(error);
  }

  res.json({
    posts: userPosts.map((post) => post.toObject({ getters: true })),
  });

  //   let user;

  //   try {
  //     user = await User.findById(userId).populate("posts");
  //   } catch (err) {
  //     const error = new HttpError(
  //       "Fetching Posts went wrong, please try again later",
  //       500
  //     );
  //     return next(error);
  //   }

  //   if (!user || user.posts.length === 0) {
  //     return next(
  //       new HttpError("Could not find posts for the provided user id.", 404)
  //     );
  //   }

  //   res.json({
  //     posts: user.posts.map((post) => {
  //       post.toObject({ getters: true });
  //     }),
  //   });
};

// *~~~~~~~~~~GETTING POST BY POST ID~~~~~~~~~~~~~~~~~

exports.getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate("creatorId");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the post",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      "Could not find a post for the provided Id",
      404
    );
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

// *~~~~~~~~~~~~~~~~CREATING POST~~~~~~~~~~~~

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("invalid inputs passed, please check your data", 422)
    );
  }

  const {
    service,
    cost,
    imageUrl,
    startedOn,
    endsOn,
    daysRemaining,
    sharedWith,
    creatorId,
  } = req.body;

  const createdPost = new Post({
    service,
    cost,
    imageUrl,
    startedOn,
    endsOn,
    daysRemaining,
    sharedWith,
    creatorId,
  });

  let user;
  try {
    user = await User.findById(creatorId);
  } catch (err) {
    const error = new HttpError(
      "Oh NO! Creating post failed, please try again",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await createdPost.save({ session: sess });
    const post = await createdPost.save();
    console.log(createdPost);
    user.posts = user.posts.concat(post._id);
    // console.log("PUSHED!!!!!");
    await user.markModified("posts");
    // console.log("MODIFIED!!!!!");
    // await user.save({ session: sess });
    await user.save();
    // console.log("SAVEDDD!!!!!");
    // await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "RIP Creating post failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};
