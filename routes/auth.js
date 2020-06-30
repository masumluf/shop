const express = require("express");
const router = express.Router();
const {
  signupPost,
  accountActivation,
  loginPost,
  dashboardController,
  orderPlace,
} = require("../controller/authController");

const {
  signUpValidator,
  loginValidator,
} = require("../middleware/validator/signupValidator");

router.post("/signup", signUpValidator, signupPost);

router.post("/account-activation", accountActivation);

router.post("/login", loginValidator, loginPost);

router.post("/placeorder", orderPlace);

router.get("/dashboard", dashboardController);

module.exports = router;
