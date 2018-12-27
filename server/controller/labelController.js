const labelServices = require('../services/labelServices');

exports.addLabel = (req, res, next) => {
    try {
        console.log("in Controller");

        var res_result = {};
        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.userID === 'undefined') {
            throw new Error("userID is mandatory");
        } else if (typeof req.body.label === 'undefined') {
            throw new Error("label is mandatory");
        } else {
            const labelData = {
                userID: req.body.userID,
                noteID: req.body.noteID,
                label: req.body.label
            }
            labelServices.addLabel(labelData, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                }
                else {

                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    }
    catch (error) {
        next(error);
    }
}
