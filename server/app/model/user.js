/**************************************************************************************
 * @file             : user.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 05-11-2018
 **************************************************************************************/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
/**
 * 
 */
const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})
/**
 * creating user model(User) according to the schema(UserSchema)
 */
const User = mongoose.model('fundoo_user', UserSchema);

function userModel() {

}
/**
 * save function is to register the user and to save the data into the DB 
 * @param {Object} data 
 * @param {Function} callback 
 */
userModel.prototype.save = (data, callback) => {
    checkUser(data.email);
    function preSave(a) {
        if (a === true) {
            const userData = new User(data);

            userData.save((err, result) => {
                if (err) {
                    callback(err);
                } else {
                    return callback(null, result);
                }
            })
        } else {
            callback("you have already an acouont")
        }
    }
    function checkUser(email) {
        User.findOne({ "email": email }, (err, result) => {
            if (err) {
                callback(err);
            } else {
                if (result === null) {
                    preSave(true);
                } else {
                    preSave(false);
                }
            }
        })
    }
}
/**
 * find function is for login
 * @param {Object} data 
 * @param {Function} callback 
 */
userModel.prototype.find = (data, callback) => {
    /**
     * searching the email in the database
     */
    User.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);

        }
        else if (result === null) {
            callback("invalid input");
        } else {
            // var bycrptResult = bcrypt.compareSync(data.password,result.password)
            // console.log('77 : ',bycrptResult);
            console.log('78');

            if (bcrypt.compareSync(data.password, result.password)) {

                return callback(null, result);
            }
            else
                callback("password is not matched");
        }
    })
}

/**
 * to varify the id from the token
 * @param {Object} data 
 * @param {Function} callback 
 */
userModel.prototype.findID = (data, callback) => {
    /**
     * finding the id of the mongo document
     */
    User.findOne({ "_id": data.id }, (err, result) => {
        if (err) {
            callback(err);
        }
        else
            return callback(null, result);
    })
}


/**
 * forgot password helper method
 * @param {Object} data 
 * @param {Function} callback 
 */
userModel.prototype.findEmail = (data, callback) => {

    User.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else
            return callback(null, result);
    })
}
/**
 * forgot password helper method
 * @param {Object} data 
 * @param {Function} callback 
 */
userModel.prototype.findToken = (data, callback) => {
    User.findOne({ "resetPasswordToken": data.headers["access-token"] }, (err, result) => {
        if (err) {
            callback(err);
        }
        else
            console.log("user obj:", result);
        return callback(null, result);
    })
}
/**
 * updating the document with token and token expires time
 * @param {object} data 
 * @param {Function} callback 
 */
userModel.prototype.saveUser = (data, callback) => {
    User.findOneAndUpdate({ email: data.email }, {
        $set: {
            resetPasswordToken: data.resetPasswordToken,
            resetPasswordExpires: data.resetPasswordExpires
        }
    }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            console.log(result);
            return callback(null, data);
        }
    })
}

/**
 * updating and saving the new password
 * @param {object} data 
 * @param {Function} callback 
 */
userModel.prototype.savePassword = (data, callback) => {
    const hash = bcrypt.hash(data.password);
    console.log("hash................",hash);
    
    User.findOneAndUpdate({ email: data.email }, {
        $set: {
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
            password: hash
        }
    }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            console.log("updated user obj", result);
            if (result) {
                const obj = {
                    status: true,
                    email: result.email
                }
                return callback(null, obj);
            } else {
                const obj = {
                    status: false
                }
                return callback(null, obj);
            }
        }
    })
}

module.exports = new userModel;



// UserSchema.statics.save1=(data,callback)=>{
//     User.findOne({"email":data.email},(err, result) => {
//         if(err) {
//             callback(err);
//         } else {
//             if(result!==null){
//                 callback("you have already an acouont")
//             }else{
//                 const userData = new User(data);

//                 userData.save((err, result) => {
//                     if(err) {
//                         callback(err);
//                     } else {
//                        return callback(null, result);
//                     }
//                 })
//             }
//         }
//     })
// }


// UserSchema.statics.find1 = (data, callback) => {

//     User.findOne({"email":data.email},(err, result) => {
//         if(err) {
//             callback(err);

//         }
//         else if(result===null){
//             callback("invalid input");
//         }else {
//             if(result.password===data.password){

//                 return callback(null,result);
//             }
//             else
//                 callback("password is not matched");
//         }
//     })
// }


// UserSchema.statics.findID = (data, callback) => {

//     User.findOne({"_id":data.id},(err, result) => {
//         if(err) {
//             callback(err);
//         }
//         else 
//             return callback(null,result);            
//     })
// }
// UserSchema.save1