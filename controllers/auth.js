const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');

const register = async (req, res) => {
    // const {name, email, password} = req.body;
    // if(!name || !email || !password){
    //     throw new BadRequestError('Please provide name, email and password');
    // }

    const user = await User.create({ ...req.body });
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Provided Credentials are invalid');
    }

    if (await user.verifyPassword(password) === false) {
        throw new UnauthenticatedError('Provided password is invalid');
    }
    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
    register,
    login,
};