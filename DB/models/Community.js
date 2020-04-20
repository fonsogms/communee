const mongoose = require("mongoose");
const communitySchema = new mongoose.Schema(
  {
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
  },

  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
