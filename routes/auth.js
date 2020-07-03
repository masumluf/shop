const express = require("express");
const router = express.Router();
const {
  signupPost,
  accountActivation,
  loginPost,
  dashboardController,
  orderPlace,
  orderSearch,
  profitSearch,
} = require("../controller/authController");

const {
  signUpValidator,
  loginValidator,
} = require("../middleware/validator/signupValidator");

router.post("/signup", signUpValidator, signupPost);

router.post("/account-activation", accountActivation);

router.post("/login", loginValidator, loginPost);

router.post("/placeorder", orderPlace);

router.post("/ordersearch", orderSearch);

router.get("/dashboard", dashboardController);

router.post("/profit", profitSearch);

module.exports = router;
