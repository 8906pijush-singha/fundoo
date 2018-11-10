
// //dependencies
const express=require('express');
const bodyParser=require('body-parser');
//MONGO DB
require('./config/dbconfig')
//EXPRESS
const app=express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
//router
var router = require('./routes/api');
app.use('/', router);
//start server
server=app.listen(3001,()=>{
    console.log("server is connected to 3001 ");
    
});