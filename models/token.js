const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200
    },
  },
  { versionKey: false, timestamps: true }
);

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
