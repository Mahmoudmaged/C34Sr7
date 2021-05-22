const messageModel = require("../model/message.model")



module.exports=  async(req, res) => {
    try {
          const messageList=await messageModel.find({userID:req.userID});
          res.json({messageList , userName: req.userName , userID:req.userID})

    } catch (error) {
        res.json("welcome")
    }
}