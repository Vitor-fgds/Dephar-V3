const User = require("../models/users.js")
const jwt = require("jsonwebtoken")
const {BadRequestError, UnauthenticatedError} = require("../errors/index.js")

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    return res.status(201).json({
        user: {
            email: user.email,
            userType: user.userType,
            token},
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError("Por favor, digite um e-mail e uma senha!")
    }

    const user = await User.findOne({email: email})
    if (!user) {
        throw new UnauthenticatedError("Email não pertence a nenhum usuário no nosso sistema!")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (isPasswordCorrect) {
        const token = user.createJWT();
        return res.status(200).json({
            user: {
                userType: user.userType,
                token,
            }
        })
    }
    throw new UnauthenticatedError("Senha inválida!")
}

module.exports = {
    register,
    login,
}