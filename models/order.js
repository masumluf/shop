const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    orderlink: {
      type: Schema.Types.ObjectId,
      ref: "Orderlink",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
