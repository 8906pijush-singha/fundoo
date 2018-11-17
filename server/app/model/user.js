const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{ type:String,
        required:true,
    },
    email:{ type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{ type:String,
        required:true
    }
})



UserSchema.statics.save1=(data,callback)=>{
    User.findOne({"email":data.email},(err, result) => {
        if(err) {
            callback(err);
        } else {
            if(result!==null){
                callback("you have already an acouont")
            }else{
                const userData = new User(data);
                
                userData.save((err, result) => {
                    if(err) {
                        callback(err);
                    } else {
                       return callback(null, result);
                    }
                })
            }
        }
    })
}


UserSchema.statics.find1 = (data, callback) => {

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


UserSchema.statics.findID = (data, callback) => {

    User.findOne({"_id":data.id},(err, result) => {
        if(err) {
            callback(err);
        }
        else 
            return callback(null,result);            
    })
}
// UserSchema.save1
const User = mongoose.model('fundoo_user',UserSchema);

// function userModel() {

// }


// userModel.prototype.save = (data, callback) => {
//     checkUser(data.email);
//     function preSave(a){
//         if(a===true){
//             const userData = new User(data);

//             userData.save((err, result) => {
//                 if(err) {
//                     callback(err);
//                 } else {
//                    return callback(null, result);
//                 }
//             })
//         }else{
//             callback("you have already an acouont")
//         }
//     }
//     function checkUser(email){
//         User.findOne({"email":email},(err, result) => {
//             if(err) {
//                 callback(err);
//             } else {
//                 if(result===null) {
//                     preSave(true);
//                 } else {
//                     preSave(false);
//                 }
//             }
//         })
//     }
// }

// userModel.prototype.find = (data, callback) => {

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


// userModel.prototype.findID = (data, callback) => {

//     User.findOne({"_id":data.id},(err, result) => {
//         if(err) {
//             callback(err);
//         }
//         else 
//             return callback(null,result);            
//     })
// }



// userModel.prototype.findEmail = (data, callback) => {

//     User.findOne({"email":data.email},(err, result) => {
//         if(err) {
//             callback(err);
//         }
//         else 
//             return callback(null,result);            
//     })
// }

module.exports= User;