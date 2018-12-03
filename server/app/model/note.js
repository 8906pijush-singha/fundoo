/**************************************************************************************
 * @file             : note.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 05-11-2018
 **************************************************************************************/

const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const noteSchema = mongoose.Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"UserSchema"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    reminder: {
        type: String
    },
    isPinned: {
        type: Boolean
    },
    image: {
        type: String
    },
    archive: {
        type: Boolean
    },
    isTrashed: {
        type: Boolean
    }
})

const Note = mongoose.model('notes', noteSchema);

function noteModel() {

}
noteModel.prototype.save = (note, callback) => {
    console.log("ultimate save",note);
    
    const noteData = new Note(note);
    noteData.save((err, result) => {
        if (err) {
            callback(err);
        } else {          
            return callback(null, result);
        }
    })
}

module.exports = new noteModel;