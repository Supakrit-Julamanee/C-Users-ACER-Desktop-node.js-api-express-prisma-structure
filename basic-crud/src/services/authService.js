require('dotenv').config();
const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saveRefreshToken = async (userId, token) => {
    await prisma.refreshToken.upsert({
        where: { userId },
        update: { token },
        create: { userId, token },
    });
};


const verifyRefreshToken = async (userId, token) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: { userId },
    });
    return storedToken?.token === token;
};

const generateAccessToken = (userId, role, username) => {
    return jwt.sign({ userId, role, username }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m',
    });
};

const generateRefreshToken = (userId, role, username) => {
    return jwt.sign({ userId, role, username }, process.env.JWT_REFRESH_SECRET_KEY, {
        expiresIn: '1d',
    });
};

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: 'U',
        },
    });
    return newUser;
};

const findUserByUsername = async (username) => {
    return await prisma.user.findUnique({
        where: { username },
    });
};

const validateUserCredentials = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};

module.exports = {
    registerUser,
    findUserByUsername,
    validateUserCredentials,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    saveRefreshToken,
}