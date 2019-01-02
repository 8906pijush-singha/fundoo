const notes = require('../app/model/note');
const user = require('../app/model/user');
const collabService = require('../app/model/collaborator');
const async = require('async');
/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.createNote = (id, data, callback) => {

    const note = {
        "userID": id,
        "title": data.title,
        "description": data.description,
        "color": data.color,
        "reminder": data.reminder,
        "isPinned": data.isPinned,
        "image": data.image,
        "archive": data.archive,
        "isTrashed": data.isTrashed
    }
    console.log("save notes", note);

    notes.save(note, (err, result1) => {
        if (err) {

            callback(err);
        } else {
            user.updateNoteRef(result1, (err, result) => {
                if (err) {
                    callback(err);
                } else {

                    return callback(null, result1);
                }
            })
        }
    })


}


/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.deleteNote = (noteID, userID, callback) => {
    console.log("note Services", noteID.noteID, userID);
    user.getNoteArray(userID, (err, result) => {
        if (err) {
            callback(err)
        } else {
            abc();
            async function abc() {
                await def();
                function def() {
                    console.log("result[i]", result[70]);

                    for (let i = 0; i < result.length; i++) {
                        if (noteID.noteID == result[i]) {

                            result.splice(i, 1);

                        }
                    }
                }
                console.log("updated array", result.length);
                user.setNoteArray(userID, result, (err, user) => {

                    if (err) {
                        callback(err)
                    } else {
                        notes.deleteNote(noteID.noteID, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                return callback(null, result)
                            }
                        })
                    }
                })
            }

        }
    })

}



/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.getNotes = (data, callback) => {
    var finalResult = [];
    notes.getNotes(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            // return callback(null, result)
            // console.log("103 : ",result);
            user.findByUserId(data, (errorUser, resultUser) => {
                if (errorUser) {
                    callback(errorUser);
                } else {
                    const noteOwner ={
                        fname:resultUser.fname,
                        lname:resultUser.lname,
                        email:resultUser.email,
                        _id:resultUser._id
                    }
                    for (var i = 0; i < result.length; i++) {
                        var userNote = {
                            note: result[i],
                            owner: noteOwner,
                            collab: []
                        }
                        finalResult.push(userNote);
                    }

                    collabService.getCollabOwnerUserId(data, (errorCollab, resultOwnerCollab) => {
                        if (errorCollab) {
                            callback(errorCollab);
                        } else {
                            // console.log("resultOwnerCollab.................", resultOwnerCollab)
                            for (var i = 0; i < finalResult.length; i++) {
                                for (var j = 0; j < resultOwnerCollab.length; j++) {
                                    
                                    if (finalResult[i].note._id.equals(resultOwnerCollab[j].noteID)) {
                                        
                                        finalResult[i].collab.push(resultOwnerCollab[j].collabUserID)
                                        // console.log("....................resultOwnerCollab.................", resultOwnerCollab[j].collabUserID)
                                    }
                                }
                            }
                        }
                    })

                    collabService.getCollabNotesUserId(data, (errorCollab, resultCollab) => {

                        if (errorCollab) {
                            callback(errorCollab);
                        } else {
                            var operations = [];
                            for (var i = 0; i < resultCollab.length; i++) {
                                operations.push((function (collabData) {
                                    return function (callback) {

                                        collabService.getDataByNoteId(collabData.noteID, (errorNote, resultNote) => {
                                            // console.log("123 : ", resultNote);

                                            if (errorNote) {
                                                callback(errorNote)
                                            } else {
                                                var collabUserArray = [];
                                                for (var i = 0; i < resultNote.length; i++) {
                                                    collabUserArray.push(resultNote[i].collabUserID)
                                                }
                                                var collabNote = {
                                                    note: resultNote[0].noteID,
                                                    owner: resultNote[0].userID,
                                                    collab: collabUserArray
                                                }
                                                finalResult.push(collabNote);
                                                callback(null, collabNote)

                                            }
                                        })
                                    }

                                })(resultCollab[i]))
                            }
                            async.series(operations, (errorAsync, resultAsync) => {
                                if (errorAsync) {
                                    callback(errorAsync);
                                } else {
                                    callback(null, finalResult)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}


/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.updateColor = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.updateColor(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.isPinned = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.isPinned(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.updateImage = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.updateImage(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.isArchived = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.isArchived(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.setReminder = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.setReminder(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.isTrashed = (paramID, callback) => {
    console.log("in services", paramID);
    notes.getTrashStatus(paramID, (err, status) => {
        if (err) {
            callback(err);
        } else {
            if (status === true) {
                let data = {
                    status: false
                }
                notes.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            } else if (status === false) {
                let data = {
                    status: true
                }
                notes.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            }

            // return callback(null, result)
        }
    })


}

exports.editTitle = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.editTitle(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.editDescription = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);

    notes.editDescription(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.saveLabelToNote = ( paramData, callback) => {
    console.log("in services", paramData);
    if(paramData.pull){
        notes.deleteLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
    else{
        notes.saveLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
}

exports.deleteLabelToNote = ( paramData, callback) => {
    console.log("in services", paramData);

    notes.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
