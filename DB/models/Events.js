const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    where: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "User",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "User",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
