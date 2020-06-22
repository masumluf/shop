const express = require('express')
const router=express.Router()
const {signupPost,accountActivation,loginPost}=require('../controller/authController')

const {signUpValidator,loginValidator}=require('../middleware/validator/signupValidator')

router.post('/signup',signUpValidator, signupPost)

router.post('/account-activation', accountActivation)

router.post('/login',loginValidator,loginPost)


module.exports=router;