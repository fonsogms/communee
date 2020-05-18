const mongoose = require("mongoose");
const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },

    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "User",
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
        reference: "Giving",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Post",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
