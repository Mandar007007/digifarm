const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    email:{
        type:String,
        required:[true,'Please enter Email Address']
    },
    password:{
        type:String,
        minlength: [6, "Min 6 Chars"],
        select: false
    },
    contact:{
        typeof:String,
    },
    address:{
        type:String,
        required:[true,'Please enter Address']
    },
    subscribedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    avtar: {
        public_id: String,
        url: String,
    },
    isGoogle:{
        type:Boolean,
        default:false,
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    subscriber:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    verifyOTP:String,
    verifyOTPexpires:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date
})

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateOTP =  function(){
    function generateRandomNumber() {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
    }

    return generateRandomNumber();
}

userSchema.methods.generateToken =  function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET)
}

userSchema.methods.generateVerifyToken =  function(){
    const token =  jwt.sign({_id : this._id},process.env.JWT_SECRET)
    return token;
}


module.exports = mongoose.model("User", userSchema)