const Category = require("../models/category");

const { validationResult } = require("express-validator");

const errorFormat = require("../utils/validationErrorFormatter");

exports.addCategory = async (req, res, next) => {
  let { text } = req.body;

  let errorResult = validationResult(req).formatWith(errorFormat);

  if (!errorResult.isEmpty()) {
    return res.status(422).json({
      error: errorResult.mapped(),
    });
  }
  try {
    const category = new Category({ text });

    const userSavingResult = await category.save();

    if (userSavingResult) {
      return res.status(200).json({
        message: "Category Added Successfully.",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      error: "Sorry Server is busy, Please try again.",
    });
  }
};

exports.allCategory = async (req, res, next) => {
  try {
    let category = await Category.find({}).select("text");
    return res.status(200).json({
      category,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteCategory = async (req, res, next) => {};
