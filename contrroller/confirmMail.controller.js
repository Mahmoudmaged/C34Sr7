const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');


module.exports = async (req, res) => {

    const token = req.params.token;
    if (token && token !== null && token !== undefined) {
        jwt.verify(token, 'shhhhh', async (err, decoded) => {
            if (err) {
                res.json({ message: "can not verify token  " });

            } else {
                await userModel.updateOne({ email: decoded.email }, { confirmed:true});
                res.json({ message: "confirmed " });
            }

        });
    } else {
        res.json({ message: "invalidToken" });
    }


}