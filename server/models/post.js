const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//!CHECK ONCE WITH AYUSH IF TYPE NUMBER WILL STORE FLOAT VALUES AS WELL

const postSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    cost: {
      type: mongoose.Types.Decimal128,
      index: true,
    },

    imageUrl: {
      type: String,
    },
    startedOn: {
      type: Date,
    },
    endsOn: {
      type: Date,
    },
    daysRemaining: {
      type: Number,
      index: true,
    },
    sharedWith: {
      type: Array,
      default: [],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
