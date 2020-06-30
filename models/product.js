const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      minlength: 5,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    photo: {
      type: String,
      default: "default.png",
    },
    category: {
      type: String,
      default: "food",
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
