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
            } else {
                console.log("note cntl sckt ", result);
                var userNote = {
                    note: result,

                    collab: []
                }
                res_result.status = true;
                res_result.data = userNote;
                res.status(200).send(res_result);
            }
        })
    } catch (error) {
        next(error);
    }
}


exports.getNotes = (req, res, next) => {
    try {
        // console.log("note Controller", req.body);
        // const token = req.headers['user-id'];
        // console.log(token);

        var res_result = {};
        noteServices.getNotes(req.decoded, (err, result) => {
            if (err) {

                const errMessage = {
                    status: 400,
                    message: "Bad Request"
                }
                next(errMessage);
            } else {
                res_result.status = true;
                res_result.data = result;
                res.status(200).send(res_result);
            }
        })
    } catch (error) {
        next(error);
    }
}

exports.updateColor = (req, res, next) => {
    try {
        console.log("in noteController", req.body);

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
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}
exports.isPinned = (req, res, next) => {
    try {
        console.log("in noteController", req.body);
        let isPinned = null;
        var res_result = {};
        let noteID = null;
        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.isPinned === 'undefined') {
            throw new Error("pin status is mandatory");
        } else {
            noteID = req.body.noteID;
            isPinned = req.body.isPinned;

            noteServices.isPinned(noteID, isPinned, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.updateImage = (req, res, next) => {
    try {
        console.log("in noteController", req.body);

        let image = null;
        var res_result = {};
        let noteID = null;
        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.image === 'undefined') {
            throw new Error("image is mandatory");
        } else {
            noteID = req.body.noteID;
            image = req.body.color;

            noteServices.updateImage(noteID, image, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.isArchived = (req, res, next) => {
    try {
        let archive = null;
        var res_result = {};
        let noteID = null;
        console.log("in noteController", req.body);

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.archive === 'undefined') {
            throw new Error("Archive note is mandatory");
        } else {
            noteID = req.body.noteID;
            archive = req.body.archive;

            noteServices.isArchived(noteID, archive, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

        next(error);
    }
}

exports.setReminder = (req, res, next) => {
    try {
        let reminder = null;
        var res_result = {};
        let noteID = null;
        console.log("in noteController", req.body);

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.reminder === 'undefined') {
            throw new Error("reminder note is mandatory");
        } else {
            noteID = req.body.noteID;
            reminder = req.body.reminder;

            noteServices.setReminder(noteID, reminder, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

        next(error);
    }
}

exports.isTrashed = (req, res, next) => {
    try {
        var res_result = {};
        let noteID = null;
        console.log("in noteController", req.body);

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else {
            noteID = req.body.noteID;
            noteServices.isTrashed(noteID, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

        next(error);
    }
}

exports.deleteNote = (req, res, next) => {
    try {
        var res_result = {};
        let noteID = null;
        console.log("in noteController", req.body,req.decoded);

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else {
            noteID = req.body.noteID;
            noteServices.deleteNote(req.body,req.decoded, (err, result) => {
                if (err) {

                    const errMessage = {
                        status: 400,
                        message: "Bad Request"
                    }
                    next(errMessage);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

        next(error);
    }
}


exports.editTitle = (req, res, next) => {
    try {
        let title = null;
        var res_result = {};
        let noteID = null;

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.title === 'undefined') {
            throw new Error("Title is mandatory");
        } else {
            noteID = req.body.noteID;
            title = req.body.title;

            noteServices.editTitle(noteID, title, (err, result) => {
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

exports.editDescription = (req, res, next) => {
    try {
        let description = null;
        var res_result = {};
        let noteID = null;

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.description === 'undefined') {
            throw new Error("Description is mandatory");
        } else {
            noteID = req.body.noteID;
            description = req.body.description;

            noteServices.editDescription(noteID, description, (err, result) => {
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