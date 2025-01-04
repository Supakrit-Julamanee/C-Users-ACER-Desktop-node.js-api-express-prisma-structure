const userService = require('../services/authService');
const ResponseModel = require('../utils/responseModel');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Refresh access token 
    try {
        const { refreshToken } = await req.body;

        if (!refreshToken) {
            return res.status(401).json(ResponseModel.fail('Refresh token is required'));
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        const userId = decoded.userId;
        const role = decoded.role;
        const username = decoded.username;

        const isValid = await userService.verifyRefreshToken(userId, refreshToken);

        if (!isValid) {
            return res.status(403).json(ResponseModel.fail('Invalid or expired refresh token'));
        }

        const newAccessToken = userService.generateAccessToken(userId, role, username);
        const newRefreshToken = userService.generateRefreshToken(userId, role, username);

        await userService.saveRefreshToken(userId, newRefreshToken);

        res.status(200).json(ResponseModel.success('Token refreshed successfully', { accessToken: newAccessToken, refreshToken: newRefreshToken }, 1));
    } catch (error) {
        console.log(error.message);
        return res.status(403).json(ResponseModel.fail('Invalid or expired refresh token'));
    }
};

const registerUser = async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Register a new user 
    try {
        const { username, password } = req.body;

        const user = await userService.findUserByUsername(username);
        if (user) {
            return res.status(200).json(ResponseModel.fail('User already exists'));
        }

        const newUser = await userService.registerUser(username, password);
        res.status(201).json(ResponseModel.success('User registered successfully', newUser.id, 1));
    } catch (error) {
        next();
    }
};

const loginUser = async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Login user
    try {
        const { username, password } = req.body;
        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(200).json(ResponseModel.fail('Invalid username or password'));
        }

        const isPasswordValid = await userService.validateUserCredentials(user, password);
        if (!isPasswordValid) {
            return res.status(200).json(ResponseModel.fail('Invalid username or password'));
        }

        const accessToken = userService.generateAccessToken(user.id, user.role, user.username);
        const refreshToken = userService.generateRefreshToken(user.id, user.role, user.username);

        // Store refresh token in the database or Redis (optional but recommended)
        await userService.saveRefreshToken(user.id, refreshToken);

        res.status(200).json(ResponseModel.success('Login successful', { accessToken, refreshToken }, 1));
    } catch (error) {
        console.log(error.message);
        next();
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken
};