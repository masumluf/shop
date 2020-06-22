const {Schema,model}=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new Schema({
    name:{
        type:String,
        minlength:3,
        trim:true,
        required: true
    },
    email:{
        type:String,
        minlength: 5,
        unique: true,
        required: true
    },
    password:{
        type:String,
        minlength:3,
        required: true
    },

    role:{
        type:String,
        default: 'subscriber'
    },
    passwordResetLink:{
        data:String,
        default:''
    }
},{
    timestamps: true
})

userSchema.pre('signupPost', function (next) {
    var user=this;
    if (user.isModified('password')){
        bcrypt.hash(user.password,8,(err,hash)=>{
            if (err) return next(err);
            //console.log(hash)
            user.password=hash
            next()
        })
    }else{
        next()
    }
})

const User = model('User', userSchema)

module.exports = User