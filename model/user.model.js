const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    userName:{type:String},
    email:{type:String},
    password:{type:String},
    confirmed:{type:Boolean , default:false},
    role:{type:String , default:'user'}

})

module.exports = mongoose.model('user',userSchema);
