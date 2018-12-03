const noteServices=require('../services/noteServices');

exports.createNote = (req, res, next) => {
    try {
        console.log("note Controller");
        
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