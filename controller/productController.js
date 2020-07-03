const Product = require("../models/product");
const Orderlink = require("../models/orderlink");
const Order = require("../models/order");
const { validationResult } = require("express-validator");

const errorFormat = require("../utils/validationErrorFormatter");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const multer = require("multer");

exports.addProduct = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "client/public/product");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    // const imagedata = req.file.path;
    // console.log(imagedata);

    try {
      let { token, title, description, price, category } = req.body;

      if (
        title.length === 0 &&
        description.length === 0 &&
        price.toString() === 0
      ) {
        return res.status(422).json({
          error: "Please Provide all Information.",
        });
      }

      //const { _id, role, company_id } = jwt.decode(token);
      const product = new Product({
        title,
        description,
        price,
        category,
        photo: req.file.filename,
      });

      const userSavingResult = await product.save();

      if (userSavingResult) {
        return res.status(200).json({
          message: "Product Added Successfully.",
        });
      }
      //console.log(req.file.filename);
    } catch (e) {
      console.log(e);
      return res.status(422).json({ error: "Failed to add New Product" });
    }
  });
};

exports.deleteProduct = async (req, res, next) => {
  let { id, token } = req.body;
  const { role } = jwt.decode(token);

  if (role === "subscriber") {
    return res.status(422).json({
      error: "You are not authorized to modify this item",
    });
  }

  try {
    let product = await Product.findOneAndDelete({
      _id: id,
    });
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return res.status(422).json({
      error: "Sorry Item has not removed.",
    });
  }
};
exports.updateProduct = async (req, res, next) => {
  let { token, id, title, description, category, price } = req.body;

  const { role } = jwt.decode(token);

  if (role === "subscriber") {
    return res.status(422).json({
      error: "You are not authorized to make this Action",
    });
  }

  try {
    let updatedRecord = {
      title,
      description,
      category,
      price,
    };

    let product = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: updatedRecord },
      { new: true }
    );
    if (product) {
      return res.status(202).json({
        message: "Updated",
      });
    }
  } catch (e) {
    return res.status(422).json({
      error: "Sorry Task Failed",
    });
  }
};
exports.getAllProduct = async (req, res, next) => {
  try {
    let product = await Product.find({}).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.searchProduct = async (req, res, next) => {
  const keyword = req.query.keyword || "";
  console.log(keyword);
  try {
    let products = await Product.find({}).sort({
      createdAt: -1,
    });
    const results = products.filter(
      (product) =>
        product.title.includes(keyword) || product.description.includes(keyword)
    );

    res.status(200).json(results);
  } catch (e) {
    console.log(e);
  }
};

exports.singleProduct = async (req, res, next) => {
  //d.id===parseInt(req.params.id)
  const keyword = req.params.id;

  try {
    let products = await Product.findOne({ _id: keyword });
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    let product = await Orderlink.find({}).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.orderDetail = async (req, res, next) => {
  const id = req.params.id;

  try {
    let orderDetails = await Orderlink.findOne({ _id: id });
    let products = await Order.find({ orderlink: id }).populate({
      path: "product",
      select: "title _id description photo",
    });
    res.status(200).json({ products, orderDetails });
  } catch (e) {
    console.log(e);
  }
};

exports.updateStatus = async (req, res, next) => {
  let { _id, stats } = req.body;

  console.log(_id, stats);
  let updatedRecord = {
    status: stats,
  };
  try {
    let product = await Orderlink.findByIdAndUpdate(
      _id,
      { $set: updatedRecord },
      { new: true }
    );

    if (product) {
      return res.status(200);
    }
  } catch (e) {
    console.log(e);
    return res.status(422);
  }
};
