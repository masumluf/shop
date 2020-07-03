const { body } = require("express-validator");

module.exports.categoryValidator = [
  body("categoryName")
    .isLength({
      min: 2,
      max: 20,
    })
    .withMessage("Category must be 2 to 10 characters Long "),
];
