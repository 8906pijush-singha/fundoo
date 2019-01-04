/**************************************************************************************
 * @file             : userController.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 05-11-2018
 **************************************************************************************/


const userServices = require('../services/userServices');
const fs=require('fs');
const jwt = require('jsonwebtoken');
/**
 * @param {http request} req 
 * @param {http response} res 
 * @param {callback function} next 
 */
exports.registration = (req, res, next) => {
    //       console.log(token);

    try {
        let responseResult = {
            status: false,
            message: "something bad happend"
        };
        userServices.registration(req.body, (err, result) => {
            if (err) {
                responseResult.message = err;
                res.status(400).send(responseResult);
            } else {
                responseResult.message = "registerted successfully";
                responseResult.status = true;
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        next(err);
    }
}
/**
 * @param {http request} req 
 * @param {http response} res 
 * @param {callback function} next 
 */
exports.login = (req, res, next) => {
    try {
        
        userServices.login(req.body, (err, result) => {
            if (err) {
                const obj = {
                    status: 400,
                    msg: "something bad happened"
                }
                next(obj)
            } else {
                const token = jwt.sign({
                    id: result.id,
                    status: true,
                    message: "login successful",
                }, 'secret1', { expiresIn: '24h' });
                console.log("token===\n", token);
                const obj = {
                    token: token,
                    userName: result.fname + " " + result.lname,
                    profilePic:result.profilePic
                }


                res.status(200).send(obj);
            }
        })
    } catch (err) {
        next(err)
    }
}
/**
 * @param {http request} req 
 * @param {http response} res 
 * @param {callback function} next 
 */
exports.tokenValid = (req, res, next) => {
    try {
        let responseResult = {
            status: false
        };
        jwt.verify(req.headers['access-token'], 'secret1', function (err, decoded) {
            if (err) {
                const obj = {
                    status: 400,
                    msg: "something bad happened"
                }
                next(obj)
                // responseResult.message = err;
                // res.status(400).send(responseResult);
            }
            req.decoded = decoded;
            //console.log(decoded);
            userServices.tokenCheck(req.decoded, (err, result) => {
                //console.log(result);

                if (err) {
                    responseResult.message = err;
                    res.status(400).send(responseResult);
                } else {
                    responseResult.status = true;
                    res.status(200).send(responseResult);
                }
            })
        });
    } catch (err) {
        next(err)
    }
}
/**
 * @param {http request} req 
 * @param {http response} res 
 * @param {callback function} next 
 */
exports.forgotController = (req, res, next) => {
    try {
        userServices.forgot(req.body, (err, result) => {
            if (err) {
                console.log("control err");

                const obj = {
                    status: 400,
                    msg: "something bad happened"
                }
                next(obj)
                // responseResult.message = err;
                // res.status(400).send(responseResult);
            } else {

                console.log("control else");
                res.status(200).send(result);
            }
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @param {http request} req 
 * @param {http response} res 
 * @param {callback function} next 
 */
exports.resetController = (req, res, next) => {
    try {
        console.log("reset controller");

        userServices.reset(req, (err, result) => {
            if (err) {
                console.log("control err");

                const obj = {
                    status: 400,
                    msg: "something bad happened"
                }
                next(obj)
                // responseResult.message = err;
                // res.status(400).send(responseResult);
            } else {

                console.log("control else", result);
                res.status(200).send(result);
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.setProfilePic = (req, res, next) => {
    try {
        console.log("in noteController", req.body,req.file,req.decoded);
        var res_result = {};
        let userID = null;
        if (typeof req.file === 'undefined') {
            throw new Error("file is mandatory");
        }  else {
            userID = req.decoded;
            console.log("galat hai",userID);
            
           let imageString= new Buffer(fs.readFileSync(req.file.path)).toString("base64")
           userServices.setProfilePic(userID, imageString, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}