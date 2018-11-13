const userServices = require('../services/userServices');

const jwt=require('jsonwebtoken');

exports.registration = (req, res) => {
//       console.log(token);
      
      
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
}
exports.login = (req, res) => {
    let responseResult = {
        status:false,
        message:"something bad happend"
    };
    userServices.login(req.body, (err, result) => {
        if(err){
            responseResult.message = err;
            res.status(400).send(responseResult);
        } else {
            const token= jwt.sign({
                id:result.id,
                status:true,
                message:"login successfull",
              }, 'secret1', { expiresIn: '1h' });
            console.log("token===",token);
            
            res.status(200).send(token);      
        }
    })
}
exports.tokenValid = (req, res) => {
    let responseResult = {
        status:false
    };
    jwt.verify(req.header, 'secret1', function(err, decoded) {
        if(err){
            responseResult.message = err;
            res.status(400).send(responseResult);
        }
        console.log(decoded);
        userServices.tokenCheck(decoded, (err, result) => {
            if(err){
                responseResult.message = err;
                res.status(400).send(responseResult);
            } else {
                responseResult.status=true; 
                res.status(200).send(responseResult);      
            }
        })
    });
}
