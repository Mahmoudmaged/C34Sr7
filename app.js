const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
var cors = require('cors')
app.use(express.json());
app.use(cors());

app.use(require("./router/app.router"));
app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect('mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/C34Sar7',
 {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
     console.log('DB connected');
 });
app.listen(port, () => console.log(`Example app listening on port port!`))