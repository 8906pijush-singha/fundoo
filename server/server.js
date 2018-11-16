
// //dependencies
const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const url=require('./config/dbconfig')

//MONGO DB
require('./config/dbconfig')
//EXPRESS
const app=express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
//router
var router = require('./routes/api');
app.use('/', router);
app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    error.msg="not found";
    res.send(error);
    next();
})
app.use((error,req,res,next)=>{
    if(error){
        const obj={
            msg:"server problem"
        }
        res.status(500).send(obj);
    }
    next();
})
//start server
server=app.listen(3001,()=>{
    console.log("server is connected to 3001 ");
    
});
startMongo(url);

function startMongo(){
const mongoose=require('mongoose');
mongoose.connect(url,{useCreateIndex:true,useNewUrlParser:true});
const db=mongoose.connection;

db.on('error',()=>{
    console.error('connection error with mongodb...');
    process.exit(0);
})

db.once('open',()=>{
    console.log('MongoDB is connected');
})
}