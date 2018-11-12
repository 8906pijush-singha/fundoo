const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String
})

var User = mongoose.model('fundoo_user',UserSchema);

function userModel() {

}
userModel.prototype.save = (data, callback) => {
    checkUser(data.email);
    function preSave(a){
        if(a===true){
            const userData = new User(data);

            userData.save((err, result) => {
                if(err) {
                    callback(err);
                } else {
                   return callback(null, result);
                }
            })
        }else{
            callback("you have already an acouont")
        }
    }
    function checkUser(email){
        User.findOne({"email":email},(err, result) => {
            if(err) {
                callback(err);
            } else {
                if(result===null) {
                    preSave(true);
                } else {
                    preSave(false);
                }
            }
        })
    }
}

userModel.prototype.find = (data, callback) => {

    User.findOne({"email":data.email},(err, result) => {
        if(err) {
            callback(err);
        
        }
        else if(result===null){
            callback("invalid input");
        }else {
            if(result.password===data.password){
 
                return callback(null,result);
            }
            else
                callback("password is not matched");
        }
    })
}
module.exports= new userModel;