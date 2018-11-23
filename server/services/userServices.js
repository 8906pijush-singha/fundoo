const user = require('../app/model/user');
const nodemailer = require('nodemailer');
const async=require('async');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt-nodejs');

exports.registration = (data, callback) => {


    data.password =bcrypt.hashSync(data.password);

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

exports.forgot = (data, callback) => {
    user.findEmail(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            async.waterfall([
                function(done) {
                    jwt.sign({
                        data: result.email
                      }, 'secretOne', { expiresIn: '24h' }, function(err, token){

                        result.resetPasswordToken = token;
                        result.resetPasswordExpires = Date.now() + 3600000;
                        user.saveUser(result,(err,result)=>{
                            if(err){
                                console.log("hello2");
                                
                                callback(err);
                            }else{
                                console.log("hello1");
                                
                                done(err,token,result);
                            }
                        })
                      });
                },
                    function(token, person, done) {
                        // console.log("person=",person);
                        
                        var smtpTransport = nodemailer.createTransport({
                          service: 'Gmail',
                          auth: {
                            user: 'mikkusharma420@gmail.com',
                            pass: 'Pijush@8906'
                          }
                        });
                        
                        var mailOptions = {
                          to: person.email,
                          from: 'mikkusharma420@gmail.com',
                          subject: 'Fundoo Password Reset',
                          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://localhost:3000/reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        };
                        
                        smtpTransport.sendMail(mailOptions, function(err,info) {
                        if(err){
                            // console.log(err);
                            
                            callback (err);
                        }else{
                            // console.log("info",info);
                            
                            const obj={
                                success: true,
                                msg: 'An e-mail has been sent to ' + person.email + ' with further instructions.',
                                success_code: 200
                            }
                            done(err,'done');
                            return callback(null, obj);
                            }
                        });
                    }]
                    // ,{
                    //     function(err) {
                    //         if (err) return next(err);
                    //         res.json({
                    //             success: false,
                    //             msg: "Something went wrong",
                    //             success_code: 500
                    //         });
                    //     }
                    // }
            )
        }
    })
}

exports.reset = (data, callback) => {
    user.findToken(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            async.waterfall([
                function(done) {
                    if(Date.now()<=result.resetPasswordExpires){
                        // result.password=data.body.password;
                        //console.log(data.headers['access-token'])
                        jwt.verify(data.headers['access-token'], 'secretOne', function(err, decoded){
                            if(err){
                                console.log(err);
                                
                            }else{
                                    const obj={
                                        email:decoded.data,
                                        password:data.body.password
                                    }
                                user.savePassword(obj,(err,result)=>{
                                    if(err){
                                        callback(err);
                                    }else if(result.status){
                                        done(err,result)
                                    }
                                })
                            }
                        })
                    }else{
                        console.log("obj");
                        callback(err)
                    }                    
                },
                    function(result, done) {
                         console.log("person=",result);
                        
                        var smtpTransport = nodemailer.createTransport({
                          service: 'Gmail',
                          auth: {
                            user: 'mikkusharma420@gmail.com',
                            pass: 'Pijush@8906'
                          }
                        });
                        
                        var mailOptions = {
                          to: result.email,
                          from: 'mikkusharma420@gmail.com',
                          subject: 'Fundoo Password Reset',
                          text: 'your password is successfully changed.'
                        };
                        
                        smtpTransport.sendMail(mailOptions, function(err,info) {
                        if(err){
                             console.log(err);
                            
                            callback (err);
                        }else{
                             console.log("info",info);
                            
                            const obj={
                                success: true,
                                msg: 'An e-mail has been sent to ' + result.email + ' with further instructions.',
                                success_code: 200
                            }
                            done(err,'done');
                            return callback(null, obj);
                            }
                        });
                    }]
                    // ,{
                    //     function(err) {
                    //         if (err) return next(err);
                    //         res.json({
                    //             success: false,
                    //             msg: "Something went wrong",
                    //             success_code: 500
                    //         });
                    //     }
                    // }
            )
        }
    })
}