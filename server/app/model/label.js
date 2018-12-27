const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var labelSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    label: {
        type:String
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
            console.log("label result",result);
            
            return callback(null, result);
        }
    })
}

module.exports = new labelModel;