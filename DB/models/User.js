const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    community: {
      type: Array,
      items: {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Community",
      },
      maxItems: 2,
    },

    /*  complains: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Complain",
      },
    ],
      events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Event",
      },
    ],
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Item",
      },
    ], */
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
