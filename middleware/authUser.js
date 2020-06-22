const expressJwt=require('express-jwt')
const User=require('../models/user')
const dotenv = require("dotenv");

// get config vars
dotenv.config();

module.exports.isAuth= expressJwt({
    secret: process.env.JWT_SECRET // req.user._id
});

module.exports.isAdmin= async (req,res,next)=>{
    try {
        let user= await User.findById(req.user._id)
        if (user.role != 'admin'){
            return res.status(400).json({
                error:"You need to Admin role to perform this action."
            })
        }
        req.adminProfile=user;
        next()
    }catch (e) {
        return res.status(422).json({
            error:e
        })
    }
}