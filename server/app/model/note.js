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
    },
    label:[
        {
            type:String,
            ref:"labelSchema"
        }
    ]
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
noteModel.prototype.deleteNote=(data,callback)=>{
    const id=data;
    console.log("id",id);
    
    Note.deleteOne({_id:id},(err,result)=>{
        if (err){
            callback(err)
        }else{
            const obj ={
                status:200,
                msg:"note is deleted successfully"
            }
            return callback(null,obj)
        }
    })
}

noteModel.prototype.getNotes=(id,callback)=>{
    Note.find({userID:id},(err,result)=>{
        if(err){
            callback(err)
        }else{
            // console.log("notes",result)
            return callback(null,result)
        }
    })
}


noteModel.prototype.updateColor=(noteID, updateParams, callback)=> {
    var updateNote = null    
    if(updateParams != null){
        updateNote = updateParams;
    }else{
        callback("color not found")
    }
    console.log("color found",noteID, updateParams);
    
    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set:{
                color:updateNote
            }
        },
        (err,result)=>{
            if(err){
                callback(err)
            }else{
                console.log("updated note",updateNote)
                return callback(null,updateNote)
            }
        });
};

noteModel.prototype.isPinned=(noteID, updateParams, callback)=> {
    var updateNote = null    
    if(updateParams != null){
        updateNote = updateParams;
    }else{
        callback("pin status is not found")
    }
    console.log("pin found",noteID, updateParams);
    
    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set:{
                isPinned:updateNote,
                archive:false,
                isTrashed:false
            }
        },
        (err,result)=>{
            if(err){
                callback(err)
            }else{
                console.log("updated note",updateNote)
                return callback(null,updateNote)
            }
        });
};

noteModel.prototype.updateImage=(noteID, updateParams, callback)=> {
    var updateNote = null    
    if(updateParams != null){
        updateNote = updateParams;
    }else{
        callback("image not found")
    }
    console.log("image found",noteID, updateParams);
    
    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set:{
                image:updateNote
            }
        },
        (err,result)=>{
            if(err){
                callback(err)
            }else{
                console.log("updated note",updateNote)
                return callback(null,updateNote)
            }
        });
};
noteModel.prototype.isArchived = (noteID, archiveParams, callback) => {
    console.log("in model");
    
    var archiveNote = null
    if (archiveParams != null) {
        archiveNote = archiveParams;
    } else {
        callback("Trashed note not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set: {
                archive: archiveNote,
                isTrashed:false,
                isPinned:false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {

                return callback(null, archiveNote)
            }
        });
};
noteModel.prototype.setReminder = (noteID, reminderParams, callback) => {
    console.log("in model");
    
    var reminderNote = null
    if (reminderParams != null) {
        reminderNote = reminderParams;
    } else {
        callback("Trashed note not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set: {
                reminder: reminderNote
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {

                return callback(null, reminderNote)
            }
        });
};
noteModel.prototype.isTrashed=(noteID, updateParams, callback)=> {
    var updateNote = null    
    if(updateParams != null){
        updateNote = updateParams.status;
    }else{
        callback("trash status is not found")
    }
    console.log("trash status is found",noteID, updateParams);
    
    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set:{
                isTrashed:updateNote,
                archive:false,
                isPinned:false
            }
        },
        (err,result)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                console.log("updated note",updateNote)
                return callback(null,updateNote)
            }
        });
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

noteModel.prototype.getTrashStatus=(id,callback)=>{
    Note.findOne({_id:id},(err,result)=>{
        if(err){
            callback(err)
        }else{
            console.log("status",result.isTrashed)
            return callback(null,result.isTrashed)
        }
    })
}

noteModel.prototype.getNoteByNoteId=(id,callback)=>{
    Note.findOne({_id:id},(err,result)=>{
        if(err){
            callback(err)
        }else{
            return callback(null,result)
        }
    })
}
noteModel.prototype.editTitle = (noteID, titleParams, callback) => {
    var noteTitle = null;
    if (titleParams != null) {
        noteTitle = titleParams;
    } else {
        callback("title not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set: {
                title: noteTitle,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {

                return callback(null, noteTitle)
            }
        });
};

noteModel.prototype.editDescription = (noteID, descParams, callback) => {
    var noteDesc = null;
    if (descParams != null) {
        noteDesc = descParams;
    } else {
        callback("Description not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $set: {
                description: noteDesc,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {

                return callback(null, noteDesc)
            }
        });
};

noteModel.prototype.saveLabelToNote = (labelParams, callback) => {
    console.log("in model", labelParams.noteID);

    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.label;
        noteID = labelParams.noteID;
    } else {
        console.log("in modelerr");

        callback("Pinned note not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $push: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("in model success");

                let res = result.label;
                res.push(labelledNote);
                return callback(null, res)
            }
        });
}

noteModel.prototype.deleteLabelToNote = (labelParams, callback) => {
    console.log("in model", labelParams.noteID);

    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.value;
        noteID = labelParams.noteID;
    } else {
        console.log("in modelerr");

        callback("Pinned note not found")
    }

    Note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $pull: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                let newArray = result.label;
                console.log("in model success result",result);

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i] === labelledNote) {
                        newArray.splice(i, 1);
                        console.log("in model success",newArray);
                        return callback(null, newArray)
                    }
                }
            }
        });
}


module.exports = new noteModel;