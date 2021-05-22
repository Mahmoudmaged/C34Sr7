const app = require("express").Router();
const auth= require("../midlleware/auth");

const authorized = require("../midlleware/autharizatioin");
// signUp
const signUpController = require("../contrroller/signUp.controller");
const signUpvalidation = require("../validation/signUp.validators")
app.post('/signUp',signUpvalidation,signUpController);
// confirmMail
app.get('/confirmeEmail/:token', require("../contrroller/confirmMail.controller"));


// signIN
const signInValidation = require("../validation/signIn.validators")
const signInController = require("../contrroller/signIn.Contrroler")
app.post('/signIn',signInValidation, signInController);
//homeProfile
app.get('/home', auth, authorized("user")  , require("../contrroller/displayHomeControoler"));
//shareProfile
app.get("/shareProfile", auth , authorized("user")  , require("../contrroller/shareProfile.controller"));
// sendMessage


app.post('/sendMessage/:id', require("../contrroller/sendMessage.controller"));







module.exports = app;
