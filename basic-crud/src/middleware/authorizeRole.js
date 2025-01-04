const ResponseModel = require('../utils/responseModel');

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (role !== requiredRole) {
            return res.status(403).json(ResponseModel.fail('Access denied'));
        }
        next();
    };
};

module.exports = authorizeRole;