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

exports.getLabels = (labelData, callback) => {
    console.log("in services",labelData);
    
    labelModel.getLabels(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.deleteLabel = (labelData, callback) => {
    console.log("in services",labelData);
    
    labelModel.deleteLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.updateLabel = (labelData, callback) => {
    console.log("in services",labelData);
    
    labelModel.updateLabel( labelData,(err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
