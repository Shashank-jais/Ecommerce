const mongoose = require('mongoose')
const userchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    profilePic:String,
    role:String,

},{
    timestamps:true
})
const usermodel=mongoose.model('user',userchema)
module.exports = usermodel