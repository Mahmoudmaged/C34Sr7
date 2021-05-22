const { validationResult } = require('express-validator');
const userModel = require('../model/user.model');
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        const signErrors = validationResult(req);
        if (signErrors.isEmpty()) {

            const user = await userModel.findOne({ email })
            if (user) {
                if (user.confirmed) {
                    const match = bycrpt.compare(password, user.password);
                    if (match) {
                        const token = jwt.sign({
                            userName: user.userName, userID: user._id,
                            isLOggedIn: true, userRole: user.role
                        } , 'shhhh');

                        res.json({ message: "done", token })

                    } else {
                        res.json({ message: "invalid password ", oldInputs: { email, password } })

                    }


                } else {
                    res.json({ message: "please confirm u email first  ", oldInputs: { email, password } })

                }
            } else {
                res.json({ message: "user not exist ", oldInputs: { email, password } })

            }

        } else {
            res.json({ message: "invalid data", messageErrors: signErrors.array(), oldInputs: { email, password } })
        }

    } catch (error) {
        res.json({ message: "catch signin  error" , error })

    }
}