const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    token: {
        type: String,
        expires: '15m' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Token', tokenSchema);
