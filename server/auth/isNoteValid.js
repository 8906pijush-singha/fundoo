const jwt = require('jsonwebtoken');

/**
  * @description Validation for token request
  * @param {http request} req 
  * @param {http response} res 
  * @param {callback} next 
  */
exports.tokenValid = (req, res, next) => {
    console.log("body",req.body);
    
    const token = req.headers['access-token'];

    if (token == 'null' || token == undefined || token == "") {
        console.log('if', token);

        let responseResult = {};
        responseResult.status = false;
        responseResult.msg = 'auth';
        res.status(200).send(responseResult);
    } else {
        jwt.verify(req.headers['access-token'], 'secret1', function (err, decoded) {
            if (err) {
                console.log("not verified")
                callback(err)
            } else {
                console.log('decoded', req.file,req.body)
                req.decoded=decoded.id
                next();
            }
        })
    }
}