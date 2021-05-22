
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {

    const token = req.header("token");
    try {
        if (token && token != null && token != undefined) {
            jwt.verify(token, 'shhhh', (err, decoded) => {
                if (err) {
                    res.json({ message: " token error" })

                } else {
                    if (decoded.isLOggedIn) {

                        req.userName = decoded.userName;
                        req.userID = decoded.userID;
                        req.role = decoded.userRole;
                        next();

                    } else {
                        res.json({ message: "u have to login first " })

                    }
                }

            });
        } else {
            res.json({ message: "invaild token" })
        }


    } catch (error) {
        res.json({ mesaage: "catch error" })
    }



}