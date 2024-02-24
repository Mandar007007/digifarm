const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async (req, res, next) => {
    try{

        const {token} = req.cookies

        if(!token)
        {
            res.status(500).json({
                success: false,
                message:"Please Login First"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findOne({_id : decoded._id})
        next();

    }catch(err){

    }
}