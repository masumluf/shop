const express = require("express");
const router = express.Router();
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  searchProduct,
  singleProduct,
  getAllOrder,
  orderDetail,
} = require("../controller/productController");

const {
  productValidator,
} = require("../middleware/validator/productValidator");

router.post("/addproduct", addProduct);
router.put("/updateproduct", updateProduct);
router.get("/getallproduct", getAllProduct);
router.get("/products", searchProduct);

router.get("/products/:id", singleProduct);

router.get("/orderdetail/:id", orderDetail);
// router.get("/allcategory", allCategory);
router.delete("/removeproduct", deleteProduct);

router.get("/getallorder", getAllOrder);

module.exports = router;
