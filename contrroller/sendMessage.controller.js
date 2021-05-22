const messageModel = require("../model/message.model");
const userModel = require("../model/user.model");

module.exports = async (req, res) => {
    const userID = req.params.id;
    const {desc}= req.body;
    try {
        const user = await userModel.findOne({ _id: userID })
        if (user) {
        await messageModel.insertMany({desc , time:Date.now() , userID})
       
            res.json({ message: "done" });
        } else {
            res.json({ message: "can not find user" });

        }
    } catch (error) {
        res.json({ message: "error catch" });
        
    }
      


    
}