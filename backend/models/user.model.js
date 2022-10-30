const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    profilepic:{type:String},
})
{timestamps:true};

module.exports = mongoose.model("userModel",User);