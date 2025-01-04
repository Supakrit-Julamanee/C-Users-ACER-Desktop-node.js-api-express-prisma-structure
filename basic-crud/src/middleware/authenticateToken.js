const jwt = require('jsonwebtoken');
const ResponseModel = require('../utils/responseModel');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) {
    return res.status(401).json(ResponseModel.fail('Access token missing or invalid'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json(ResponseModel.fail('Invalid or expired access token'));
  }
};

module.exports = authenticateToken;