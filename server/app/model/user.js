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
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})




const User = mongoose.model('fundoo_user',UserSchema);

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


userModel.prototype.findID = (data, callback) => {

    User.findOne({"_id":data.id},(err, result) => {
        if(err) {
            callback(err);
        }
        else 
            return callback(null,result);            
    })
}



userModel.prototype.findEmail = (data, callback) => {

    User.findOne({"email":data.email},(err, result) => {
        if(err) {
            callback(err);
        }
        else 
            return callback(null,result);            
    })
}
userModel.prototype.findToken = (data, callback) => {
    User.findOne({"resetPasswordToken":data.headers["access-token"]},(err, result) => {
        if(err) {
            callback(err);
        }
        else 
            console.log("user obj:",result);
            return callback(null,result);            
    })
}
userModel.prototype.saveUser=(data,callback)=>{
    // const userData = new User(data);  
    console.log(data.resetPasswordExpires,"\n\n",data.resetPasswordToken);
    
    User.findOneAndUpdate({email:data.email},{$set: {  resetPasswordToken : data.resetPasswordToken,
        resetPasswordExpires: data.resetPasswordExpires }},(err, result) => {
        if(err) {
            callback(err);
        } else {
            console.log(result);
           return callback(null, data);
        }
    })
}


userModel.prototype.savePassword=(data,callback)=>{
    console.log(data);         
    User.findOneAndUpdate({email:data.email},{$set: {  resetPasswordToken :undefined,
        resetPasswordExpires:undefined,password:data.password }},(err, result) => {
        if(err) {
            callback(err);
        } else {
            console.log("updated user obj",result);
            if(result){
                const obj={
                    status:true,
                    email:result.email
                }
                return callback(null, obj);
            }else{
                const obj={
                    status:false
                }
                return callback(null,obj);
            }
        }
    })
}

module.exports= new userModel;



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