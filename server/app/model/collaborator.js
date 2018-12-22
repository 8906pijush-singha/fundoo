/**************************************************************************************
 * @file             : note.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 12-12-2018
 **************************************************************************************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collabSchema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "fundoo_user"
    },
    noteID: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    },
    collabUserID: {
        type: Schema.Types.ObjectId,
        ref: "fundoo_user"
    },

})

const Collab = mongoose.model('collab', collabSchema);

function collabModel() {

}

collabModel.prototype.saveCollab = (collabData, callback) => {
    console.log("ultimate save", collabData);

    const Data = new Collab(collabData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}

collabModel.prototype.getCollabNotesUserId = (userID, callback) => {
    // console.log("ultimate save", collabData);
    Collab.find({ collabUserID: userID }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

collabModel.prototype.getDataByNoteId = (noteID, callback) => {
    // console.log("ultimate save", noteID);
    Collab.find({ noteID: noteID }).populate('userID',  { notes:0, password: 0 ,__v:0,resetPasswordExpires:0,resetPasswordToken:0}).populate('collabUserID',  { notes:0, password: 0 ,__v:0,resetPasswordExpires:0,resetPasswordToken:0}).populate('noteID').exec(function (err, result) {
        // console.log(err);
        // console.log(result);
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}





module.exports = new collabModel;