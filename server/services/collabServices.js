const collabModel = require('../app/model/collaborator')
const userModel = require('../app/model/user')


exports.saveCollab = (collabData, callback) => {
    console.log("in services",collabData);
    
    collabModel.saveCollab(collabData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.getCollabNotesUserId = (userId, callback) => {
    collabModel.getCollabNotesUserId(userId, (err, result) => {
        if(err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}



exports.getCollabDetails = (callback) => {
    console.log("30");

    userModel.getUserDetails((err, result) => {
        if(err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}