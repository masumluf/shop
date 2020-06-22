const User = require('../models/user');
const bcrypt = require('bcrypt');
const {sendEmail}=require('../utils/Email');
const jwt=require('jsonwebtoken');
const dotenv = require("dotenv");

// get config vars
dotenv.config();
//sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
const {
    validationResult
} = require('express-validator')




const errorFormat = require('../utils/validationErrorFormatter')

// exports.signupView = (req, res, next) => {
//
//     res.render('auth/signup', {
//         title: 'Register as a New User',
//         error: {},
//         value: {},
//         flashMessage: Flash.getMessage(req)
//     })
// }

exports.signupPost = async (req, res, next) => {
    let {
        name,
        email,
        password
    } = req.body

    let errorResult = validationResult(req).formatWith(errorFormat)


    if (!errorResult.isEmpty()) {

        return res.status(422).json({
            error:errorResult.mapped()
        })

    }

    try{
        let user=await User.findOne({email})
        if (user){
            return res.status(422).json({
                error:"An user found by this Email. Please try with another Email address."
            })
        }
        const token=jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn: '10m'})
        const url=`${process.env.CLIENT_URI}/auth/activation/${token}`

        //sendGrid email function
        // let sendEmail={
        //     to:email,
        //     from:'chris@tele2call.com',
        //     subject:'Account Activation Link',
        //     text:"Hello.."
        // };

          //const mailConfirmation= await sendGrid.send(sendEmail);

        //console.log(mailConfirmation)

        //user.password=undefined
        let msg=`
            Dear ${name} please click on this link to active your account . Here is your Link ${url}
        `;

        sendEmail(email,'Account Activation Email', msg)

        return res.status(200).json({
            url,
            message:"Activation link Sent to your Email."
        })


    }catch (error) {
        return res.status(402).json({
            message: error.mapped()
        })
    }



}

exports.accountActivation=async (req,res)=>{

    //let errorResult = validationResult(req).formatWith(errorFormat)

    const {token}=req.body;

    if (!token){
        return res.status(401).json({
            error:"Sorry Token not Found. Please click on the valid Link"
        })
    }

    const {name,email,password}=jwt.decode(token);

    try{

        let userChecking=await User.findOne({email})
        if (userChecking) {
            return res.status(422).json({
                error: "Account Already Activated.Please Login."
            })
        }

            await jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION);



            let hashPassword = await bcrypt.hash(password, 8)

            const user=new User({name,email,password:hashPassword})

            const userSavingResult=await user.save();

            if (userSavingResult){
                return res.status(200).json({
                    message:"Signup Successfull."
                })
            }




    }catch (e) {
        return res.status(401).json({
            error:e.mapped()
        })
    }
}





exports.loginView = (req, res, next) => {
    // console.log(req.session.user);
    // console.log(req.session.isLoggedIn);


    res.render('auth/login', {
        title: 'Login Area',
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
    })
}



exports.loginPost = async (req, res, next) => {

    let errorResult = validationResult(req).formatWith(errorFormat)

    if (!errorResult.isEmpty()) {

        return res.status(422).json({
            error: errorResult.mapped()
        })
    }

    let {
        email,
        password
    } = req.body


    try {

            let user = await User.findOne({
                email
            })

            if (!user) {
                return res.status(422).json({
                    error: "wrong Credentials"
                })
            }

            let isPassword = await bcrypt.compare(password, user.password)
            if (!isPassword) {
                return res.status(422).json({
                    error: "wrong Password"
                })
            }
        //sending email...

            // let msg=`Hello this is an test email ${user}`
            //
            // sendEmail(user.email,'Login Successfully',msg)

            // let emailSend= await sendEmail(user.email,'Login Successfully',msg)
            //
            //     if (emailSend){
            //         console.log('Email has been sent Successfully.')
            //     } else {
            //         console.log('Sorry email has not been sent Successfully. Sorry For that')
            //     }


        //sending email end...

            let token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn: '7d'})

            //let { _id, name, email, role } = user;
            return res.status(200).json({
                token,
                user: { _id:user._id, name:user.name, email:user.email, role:user.role },
                message: "login successfull"
            })

        } catch (e) {
            console.log(e)
            return res.status(402).json({
                error: e.response.data
            })
        }


}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}

exports.passwordGetController = (req, res, next) => {
    res.render('dashboard/password', {
        title: 'Change Password',
        flashMessage: Flash.getMessage(req)
    })
}

exports.passwordPostController = async (req, res, next) => {

    let {
        oldPassword,
        newPassword,
        rePassword
    } = req.body

    if (newPassword !== rePassword) {
        req.flash('fail', 'Password did not match.')
        return res.redirect('/auth/changepassword')
    }

    try {
        let checkOldPassword = await bcrypt.compare(oldPassword, req.user.password)
        if (!checkOldPassword) {
            req.flash('fail', 'Invalid Old Password.')
            return res.redirect('/auth/changepassword')
        }

        let hashPassword = await bcrypt.hash(newPassword, 11)
        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                password: hashPassword
            }
        })

        req.flash('success', 'Password Has Been Changed.')
        return res.redirect('/auth/changepassword')

    } catch (error) {
        console.log(error)
        next(error)

    }

}