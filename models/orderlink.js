const { Schema, model } = require("mongoose");

const orderlinkSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Orderlink = model("Orderlink", orderlinkSchema);

module.exports = Orderlink;
