const createError = require("http-errors");

module.exports.Response = {
    success: (res, status = 200, message = "Ok", body = {}) => {
        res.status(status).json({ message, results: body });
    },
    error: (res, error = null, errorMessage = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        if(errorMessage===null){
            res.status(statusCode).json({message});
        }else{
            res.status(statusCode).json({message: errorMessage});
        }
    },
};