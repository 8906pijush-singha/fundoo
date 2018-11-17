const userServices = require('../services/userServices');

const jwt=require('jsonwebtoken');

exports.registration = (req, res,next) => {
//       console.log(token);
      
    try{  
    let responseResult = {
        status:false,
        message:"something bad happend"
    };
    userServices.registration(req.body, (err, result) => {
        if(err){
            responseResult.message = err;
            res.status(400).send(responseResult);
        } else {
            responseResult.message="registerted successfully";
            responseResult.status = true;
            responseResult.data = result;
            res.status(200).send(responseResult);
        }
    })
}catch(err){
    next(err);
}
}
exports.login = (req, res,next) => {
    try{
    // let responseResult = {
    //     status:false,
    //     message:"something bad happend"
    // };
    // const v=new Error();
    // v.
    userServices.login(req.body, (err, result) => {
        if(err){
            const obj={
                status:400,
                msg:"something bad happened"
            }
            next(obj)
            // responseResult.message = err;
            // res.status(400).send(responseResult);
        } else {
            const token= jwt.sign({
                id:result.id,
                status:true,
                message:"login successful",
              }, 'secret1', { expiresIn: '1h' });
            console.log("token===\n",token);
            
            res.status(200).send(token);      
        }
    })
}catch(err){
    next(err)
}
}
exports.tokenValid = (req, res, next) => {
    try{
    let responseResult = {
        status:false
    };
    jwt.verify(req.headers['access-token'], 'secret1', function(err, decoded) {
        if(err){
            const obj={
                status:400,
                msg:"something bad happened"
            }
            next(obj)
            // responseResult.message = err;
            // res.status(400).send(responseResult);
        }
        req.decoded=decoded;
        //console.log(decoded);
        userServices.tokenCheck(req.decoded, (err, result) => {
            //console.log(result);
            
            if(err){
                responseResult.message = err;
                res.status(400).send(responseResult);
            } else {
                responseResult.status=true; 
                res.status(200).send(responseResult);      
            }
        })
    });
}catch(err){
    next(err)
}
}

exports.forgotController = (req, res, next) => {
    //       console.log(token);
          
       try{   
        let responseResult = {
            status:false,
            message:"something bad happend"
        };
        userServices.forgot(req.body, (err, result) => {
            if(err){
                const obj={
                    status:400,
                    msg:"something bad happened"
                }
                next(obj)
                // responseResult.message = err;
                // res.status(400).send(responseResult);
            } else {

                res.status(200).send(responseResult);
            }
        })
    }catch(err){
        next(err)
    }
    }