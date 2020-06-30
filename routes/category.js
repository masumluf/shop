const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  allCategory,
} = require("../controller/categoryController");

const {
  categoryValidator,
} = require("../middleware/validator/categoryValidator");

router.post("/addcategory", categoryValidator, addCategory);
router.get("/allcategory", allCategory);
router.delete("/deletecategory", deleteCategory);

module.exports = router;
