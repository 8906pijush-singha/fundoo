// exports.registration=(req,res)=>{
//     try {
//         if(req.body==null)
//             throw "empty body"
//     } catch (err) {
        
//     }
// }
const userServices = require('../services/userServices');

const jwt=require('jsonwebtoken');

exports.registration = (req, res) => {

//       console.log(token);
      
//       jwt.verify(token, 'secret1', function(err, decoded) {
//         console.log(decoded) 
//           });
    let responseResult = {status:false,
    message:"something bad happend"};
    if(req.body == null){
        responseResult.message = 'field empty';
        res.status(404).send(responseResult);
    } 
    userServices.registration(req.body, (err, result) => {
        if(err){
            responseResult.message = err;
            res.status(400).send(responseResult);
        } else {
            console.log("control " ,result);
            responseResult.message="registerted successfully";
            responseResult.status = true;
            responseResult.data = result;
            res.status(200).send(responseResult);
        }
    })
}
exports.login = (req, res) => {
    console.log(req.body);
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
            console.log(token);
            // responseResult.token = token;
            res.status(200).send(token);
            
        }
    })
}
















// const obj={
            //     id:result.id,
            //     status:true,
            //     message:"login successful",
            // }
            // console.log(result);
            // res.status(200).send(obj);