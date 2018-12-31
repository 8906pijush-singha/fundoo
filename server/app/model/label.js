const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var labelSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    label: {
        type: String,
        unique: true
    }
})
var label = mongoose.model('fundooLabels', labelSchema);

function labelModel() {

}

labelModel.prototype.addLabel = (labelData, callback) => {
    console.log("ultimate save", labelData);

    const Data = new label(labelData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("label result", result);

            return callback(null, result);
        }
    })
}


labelModel.prototype.getLabels = (id, callback) => {
    console.log("in model", id);

    label.find({ userID: id.userID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
}

labelModel.prototype.deleteLabel = (id, callback) => {
    console.log("in model", id);

    label.deleteOne({ _id: id.labelID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
}

labelModel.prototype.updateLabel = ( changedLabel, callback) => {
    var editLabel = null;
    var labelId = null;
    console.log("in model",changedLabel);

    if (changedLabel != null) {
        editLabel = changedLabel.editLabel;
        labelId=changedLabel.labelID
    } else {
        callback("Pinned note not found")
    }

    label.findOneAndUpdate(
        {
            _id: labelId
        },
        {
            $set: {
                label: editLabel
            }
        },
        (err, result) => {
            if (err) {
                console.log("in modelerr");

                callback(err)
            } else {
                console.log("in modelsuccess");

                return callback(null, changedLabel)
            }
        });
};
module.exports = new labelModel;