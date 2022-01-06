const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subscriptionSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },

    //!CHECK ONCE WITH AYUSH IF TYPE NUMBER WILL STORE FLOAT VALUES AS WELL

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
