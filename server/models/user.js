const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    picture: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    // friends: {
    //   type: Array,
    //   default: [],
    // },
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    spent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
