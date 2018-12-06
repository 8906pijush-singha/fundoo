const noteServices=require('../services/noteServices');
exports.createNote = (req, res, next) => {
    try {
        console.log("note Controller",req.body);
        
        var res_result = {};
        noteServices.createNote(req.body, (err, result) => {
            if (err) {

                const errMessage = {                   
                    status: 400,
                    message: "Bad Request"
                }
                next(errMessage);
            }
            else {
                console.log("note cntl sckt ",result);
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
        console.log("note Controller",req.decoded);
        
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

exports.updateNote = (req, res, next) => {
    try {
        var paramData = {};
        var res_result = {};
        var noteID = null;
        if(typeof req.title !== 'undefined'){
            paramData.title = req.title;
        }else{
            throw new Error("Title is mandatory");
        }
        if(typeof req.id !== 'undefined'){
            noteID = req.id;
        }else{
            throw new Error("Title is mandatory");
        }
        if(typeof req.description !== 'undefined'){
            paramData.description = req.description;
        }
        
        noteServices.updateNote(noteID, paramData, (err, result) => {
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