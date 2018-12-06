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
noteModel.prototype.delete=(data,callback)=>{
    const id=data.id;
    Note.deleteOne({_id:id},(err,result)=>{
        if (err){
            callback(err)
        }else{
            const obj ={
                status:200,
                msg:"note is deleted successfully"
            }
            return callback(null,result)
        }
    })
}

noteModel.prototype.getNotes=(id,callback)=>{
    Note.find({userID:id},(err,result)=>{
        if(err){
            callback(err)
        }else{
            console.log("notes",result)
            return callback(null,result)
        }
    })
}


noteSchema.methods.updateNote = function updateNote (noteID, updateParams, cb) {
    var updateNote = {}    
    if(updateParams != null){
        updateNote.title = updateParams.title;
        updateNote.description = updateParams.description;
    }
    return this.notes.findOneAndUpdate(
        {
            _id: noteID
        },
        updateNote, cb);
};


noteModel.prototype.getNotes=(id,callback)=>{
    Note.find({userID:id},(err,result)=>{
        if(err){
            callback(err)
        }else{
            console.log("notes",result)
            return callback(null,result)
        }
    })
}

module.exports = new noteModel;