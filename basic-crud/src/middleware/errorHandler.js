const ResponseModel = require('../utils/responseModel');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorDetails = {
        type: err.name || 'ServerError',
        details: err.details || err.stack,
    };

    res.status(statusCode).json(ResponseModel.error(message, errorDetails));
};

module.exports = errorHandler;