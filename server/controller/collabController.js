const collabServices=require('../services/collabServices')



exports.saveCollab = (req, res, next) => {
    try {
        var res_result = {};
        console.log("in noteController", req.body);

        if (typeof req.body.noteID === 'undefined') {
            throw new Error("noteID is mandatory");
        } else if (typeof req.body.userID === 'undefined') {
            throw new Error("userID is mandatory");
        } else if (typeof req.body.collabID === 'undefined') {
            throw new Error("collabID is mandatory");
        } else {
            const collabData = {
                userID: req.body.userID,
                noteID: req.body.noteID,
                collabUserID: req.body.collabID
            }
            collabServices.saveCollab(collabData, (err, result) => {
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