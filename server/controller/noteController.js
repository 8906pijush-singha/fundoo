const noteServices = require('../services/noteServices');
exports.createNote = (req, res, next) => {
    try {
        console.log("note Controller", req.body);

        var res_result = {};
        noteServices.createNote(req.decoded, req.body, (err, result) => {
            if (err) {

                const errMessage = {
                    status: 400,
                    message: "Bad Request"
                }
                next(errMessage);
            }
            else {
                console.log("note cntl sckt ", result);
                res_result.status = true;
                res_result.data = result;
                res.status(200).send(res_result);
            }
        })
    }
    catch (error) {
        next(error);
    }
}



exports.deleteNote = (req, res, next) => {
    try {
        console.log("note Controller");

        var res_result = {};
        noteServices.deleteNote(req.body, (err, result) => {
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
    catch (error) {
        next(error);
    }
}

exports.getNotes = (req, res, next) => {
    try {
        console.log("note Controller", req.decoded);

        var res_result = {};
        noteServices.getNotes(req.decoded, (err, result) => {
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
    catch (error) {
        next(error);
    }
}

exports.updateColor = (req, res, next) => {
    try {
        console.log("in noteController",req.body);
        
        let color = null;
        var res_result = {};
        let noteID = null;
        // if(typeof req.title !== 'undefined'){
        //     paramData.title = req.title;
        // }else{
        //     throw new Error("Title is mandatory");
        // }
        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.color === 'undefined') {
            throw new Error("color is mandatory");
        } else {
            noteID = req.body.noteID;
            color = req.body.color;

            noteServices.updateColor(noteID, color, (err, result) => {
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