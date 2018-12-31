const labelServices = require('../services/labelServices');

exports.addLabel = (req, res, next) => {
    try {
        console.log("in Controller",req.body,req.decoded);

        var res_result = {};
        if (typeof req.decoded === "undefined") {
        console.log("in Control");

            throw new Error("userID is mandatory");
        } else if (typeof req.body.label === "undefined") {
        console.log("in roller");

            throw new Error("label is mandatory");
        } else {
            const labelData = {
                userID: req.decoded,
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

exports.getLabels = (req, res, next) => {
    try {
        console.log("in Controller",req.body,req.decoded,req.decoded);

        var res_result = {};
        if (typeof req.decoded === "undefined") {
        console.log("in Control");

            throw new Error("userID is mandatory");
        }  else {
            const labelData = {
                userID: req.decoded,
            }
            labelServices.getLabels(labelData, (err, result) => {
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

exports.deleteLabel = (req, res, next) => {
    try {
        console.log("in Controller",req.body);

        var res_result = {};
        if (req.body.labelID === "undefined") {
        console.log("in Control");

            throw new Error("userID is mandatory");
        }  else {
            const labelData = {
                labelID: req.body.labelID,
            }
            labelServices.deleteLabel(labelData, (err, result) => {
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

exports.updateLabel = (req, res, next) => {
    try {
        console.log("in Controller",req.body);

        var res_result = {};
        if (req.body.labelID === "undefined") {
            console.log("in Control");
    
                throw new Error("userID is mandatory");
            }
        else if (req.body.editLabel === "undefined") {
        console.log("in Control");

            throw new Error("userID is mandatory");
        }  else {
            const labelData = {
                editLabel: req.body.editLabel,
                labelID: req.body.labelID 
            }
            labelServices.updateLabel(labelData, (err, result) => {
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