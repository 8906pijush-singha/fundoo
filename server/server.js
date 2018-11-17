/**************************************************************************************
 * Purpose           : Main Entry point of Backend Server
 * @file             : server.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 05-11-2018
 **************************************************************************************/

 // //dependencies
const express = require('express');                     //web application framework
const bodyParser = require('body-parser');              //used parsing request bodies
const morgan = require('morgan');                       //used for logging request deatils
const url = require('./config/dbconfig')                //requires the file to get database address
const cors = require('cors')                            //used to handle cross domain requests

//MONGO DB
// require('./config/dbconfig')

//EXPRESS
const app = express();
app.use(bodyParser.urlencoded({extended: true }));    //parses urlencoded bodies      
app.use(bodyParser.json());                           //parses only json requests
app.use(morgan("dev"));                               //logs the request details with colored status code

//router
var router = require('./routes/api');                 //routes to APIs
app.use(cors());                 
app.use('/', router);                                 //routes to root file 
// app.use((req,res,next)=>{
//     const error=new Error();
//     error.status=404;
//     error.msg="not found";
//     res.send(error);
//     next();
// })

/* express catches the errors and process them */
app.use((error,req,res,next)=>{
    if(error.message == "Internal Server Error"){
        const obj = {
            msg:"server problem"
        }
        res.status(500).send(obj);        //catches the error for SERVER PROBLEM from controller
    }
    else if(error.status==400){
        // console.log(error)
        res.status(400).send(error);      //catches the error for PAGE NOT FOUND from controller
    }
    next();                               //routes to controller if error solved
})

//start server
server = app.listen(3001,()=>{               //server runs on port 3001
    console.log("server is connected to 3001 ");  
});
startMongo(url);                           //call for db connection


/* MONGODB CONNECTION */
function startMongo(){
    const mongoose = require('mongoose');         //requiring mongoose framework for connection
    mongoose.connect(url,{useCreateIndex:true,useNewUrlParser:true}); //used to establish connection with database
    const db = mongoose.connection;               //used to perform mongoose connection events

    db.on('error',()=>{                         //throws error if connection failed
        console.error('connection error with mongodb...');  
        process.exit(0);                        //stops the server if database connection fails
    })

    db.once('open',()=>{                        //throws error if connection failed
        console.log('MongoDB is connected');       
    })
}