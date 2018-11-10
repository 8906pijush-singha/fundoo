const user = require('../app/model/user');


exports.registration = (data, callback) => {
    user.save(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}


exports.login = (data, callback) => {
    // console.log(data);
    user.find(data, (err, result) => {
        if(err) {
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}