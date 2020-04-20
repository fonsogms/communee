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
    type: {
      enum: ["Item", "Service"],
      required: true,
    },
    state: {
      enum: ["Need", "Offer"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Giving", givingSchema);
