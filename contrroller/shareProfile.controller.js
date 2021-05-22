const userModel = require("../model/user.model");


module.exports = async(req,res)=>{
    try {
    const fullURl  = req.protocol  +"://"+ req.headers.host+"/sendMessage/"+req.userID;
         res.json({message:"done" ,fullURl })
    } catch (error) {
        res.json("error")
    }

}