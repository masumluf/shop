const { body } = require("express-validator");

module.exports.productValidator = [
  body("title").not().isEmpty().withMessage("Product title must be Provided."),

  body("description")
    .not()
    .isEmpty()
    .withMessage("Product Description must be Provided."),

  body("price").not().isEmpty().withMessage("Product Price must be Provided."),
  body("category")
    .not()
    .isEmpty()
    .withMessage("Product Category must be Provided."),
];
