const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');

const { Response } = require('../common/response');
const { Config } = require('../config');

const User = require('../models/user');
const Role = require('../models/role');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return Response.error(res, new CreateError[401], 'Acceso denegado');
    try {
        const verified = jwt.verify(token, Config.tokenSecret);
        req.user = verified;
        next() // continuamos
    } catch (error) {
        Response.error(res, new CreateError[401], 'Token no es válido');
    }
}

const isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
        return Response.error(res, 403, 'Require Admin Role!');
    } catch (error) {
        return Response.error(res, 403, new CreateError[403]);
    }
}

module.exports.AuthMiddleware = {
    verifyToken,
    isAdmin
}