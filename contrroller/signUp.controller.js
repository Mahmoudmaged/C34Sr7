const { validationResult } = require('express-validator');
const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    const { userName, email, password, cPassword } = req.body;
    try {
        const signUpError = validationResult(req);
        if (signUpError.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                res.json({ message: "user already exist", oldInputs: { userName, email, password, cPassword } });
            } else {

                bcrypt.hash(password, 8, async (err, hash) => {
                    if (err) {
                        res.json({ message: "hash error" });
                    } else {
                        await userModel.insertMany({ userName, email, password: hash });
                        var token = jwt.sign({ email }, 'shhhhh');
                        let transporter = nodemailer.createTransport({
                            host: "routesession@gmail.com",
                            service: 'gmail',
                            port: process.env.PORT || 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: "routesession@gmail.com", // generated ethereal user
                                pass: "1478530123", // generated ethereal password
                            },
                        });

                        // send mail with defined transport object
                        await transporter.sendMail({
                            from: 'routesession@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: `<a href="http://localhost:3000/confirmeEmail/${token}">Confirm</a>`, // html body
                        });
                        res.json({ message: "done" });
                    }

                });

            }
        } else {
            res.json({
                message: "pleas inter valid data ", messageError: signUpError.array(),
                oldInputs: { userName, email, password, cPassword }
            })
        }

    } catch (error) {
        res.json({ message: "Catch error in signUp", error })
    }

}