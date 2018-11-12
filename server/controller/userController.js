const userServices = require('../services/userServices');

const jwt=require('jsonwebtoken');

exports.registration = (req, res) => {
//       console.log(token);
      
//       jwt.verify(token, 'secret1', function(err, decoded) {
//         console.log(decoded) 
//           });
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
            // responseResult.token = token;
            res.status(200).send(token);      
        }
    })
}



//     console.log("dsgherh",req.body);
//     let responseResult = {
//         status:false,
//         message:"something bad happend"
//     };











// const obj={
            //     id:result.id,
            //     status:true,
            //     message:"login successful",
            // }
            // console.log(result);
            // res.status(200).send(obj);