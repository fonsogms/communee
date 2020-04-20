const mongoose = require("mongoose");
const givingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Giving", givingSchema);
