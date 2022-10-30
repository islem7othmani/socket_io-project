const mongoose = require("mongoose");

const message = new mongoose.Schema(
  {
    from: {
      type:String
    },
    to: { type: String },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", message);
