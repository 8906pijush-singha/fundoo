const notes = require('../app/model/note');
const user = require('../app/model/user')
/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.createNote = (id,data, callback) => {
    // console.log("note Services", data);
    // user.getID(data.email, (err, result) => {
    //     if (err) {
    //         callback(err)
    //     } else {
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
            console.log("save notes",note);

            notes.save(note, (err, result1) => {
                if (err) {

                    callback(err);
                }
                else {
                    user.updateNoteRef(result1, (err, result) => {
                        if (err) {
                            callback(err);
                        } else {
                            return callback(null, result1);
                        }
                    })
                }
            })
        // }
    // })

}


/**
 * @param {object} data
 * @param {callback function} callback
 */
exports.deleteNote = (data, callback) => {
    console.log("note Services", data.email);
    user.getID(data.email, (err, result) => {
        if (err) {
            callback(err)
        } else {
            const note = {
                "userID": result,
                "title": data.title,
                "description": data.description,
                "color": data.color,
                "reminder": data.reminder,
                "isPinned": data.isPinned,
                "image": data.image,
                "archive": data.archive,
                "isTrashed": data.isTrashed
            }
            console.log("save notes");

            notes.save(note, (err, result) => {
                if (err) {

                    callback(err);
                }
                else {
                    user.updateNoteRef(result, (err, result) => {
                        if (err) {
                            callback(err);
                        } else {
                            return callback(null, result);
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
exports.getNotes = (data, callback) => {
    notes.getNotes(data, (err, result) => {
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
exports.updateColor = (paramID, paramData, callback) => {
    console.log("in services",paramID, paramData);
    
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
    console.log("in services",paramID, paramData);
    
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
    console.log("in services",paramID, paramData);
    
    notes.updateImage(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
