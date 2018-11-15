const user = require('../app/model/user');
var nodemailer = require('nodemailer');


exports.registration = (data, callback) => {
    user.save(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}


exports.login = (data, callback) => {
    // console.log(data);
    user.find(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}

exports.tokenCheck = (data, callback) => {
    
    user.findID(data, (err, result) => {
        if(err) {
            callback(err);
        } else {

            return callback(null, result);
        }
    })
}

exports.tokenCheck = (data, callback) => {
    
    user.findEmail(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'youremail@address.com',
                       pass: 'yourpassword'
                   }
               });

               const mailOptions = {
                from: 'sender@email.com', // sender address
                to: 'to@email.com', // list of receivers
                subject: 'Subject of your email', // Subject line
                html: '<p>Your html here</p>'// plain text body
              };
            return callback(null, result);
        }
    })
}