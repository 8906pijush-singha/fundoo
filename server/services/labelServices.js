const labelModel = require('../app/model/label');

exports.addLabel = (labelData, callback) => {
    console.log("in services",labelData);
    
    labelModel.addLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
