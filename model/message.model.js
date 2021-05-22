const mongoose = require('mongoose');

const messageSchema =mongoose.Schema({
    desc:String,
    time:String,
    userID:{type:mongoose.Schema.Types.ObjectId , ref:'user'}

})

module.exports = mongoose.model('message',messageSchema);
