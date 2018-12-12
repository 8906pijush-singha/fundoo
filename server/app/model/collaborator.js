/**************************************************************************************
 * @file             : note.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 12-12-2018
 **************************************************************************************/

const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const collabSchema = mongoose.Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"UserSchema"
    },
    noteID: {
        type:Schema.Types.ObjectId,
        ref:"noteSchema"
    },
    collabUserID: {
        type:Schema.Types.ObjectId,
        ref:"UserSchema"
    },
    
})

const Collab = mongoose.model('collab', collabSchema);

function collabModel() {

}

collabModel.prototype.save = (collabDate, callback) => {
    console.log("ultimate save",note);
    
    const Data = new Collab(collabDate);
    Data.save((err, result) => {
        if (err) {
            callback(err);
        } else {          
            return callback(null, result);
        }
    })
}