const debug = require('debug')('app:controladorAspirante');
const CreateError = require('http-errors');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Response } = require('../common/response');
const { Config } = require('../config');

const User = require('../models/user');
const Role = require('../models/role');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    roles: Joi.array()
});


// Controlador Registrarse
const signUp = async (req, res) => {
    try {
        // validate user
        const { error } = schemaRegister.validate(req.body)

        if (error) {
            return Response.error(res, new CreateError[400], error.details[0].message);
        }

        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
            return Response.error(res, new CreateError[400], "Email ya registrado");
        }

        // hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password,
        });

        if(req.body.roles){
            const foundRoles = await Role.find({name: {$in: req.body.roles}});
            user.roles = foundRoles.map(role => role._id);
        }else{
            const role = await Role.findOne({name: "user"});
            user.roles = [role._id];
        }

        const storedUser = await user.save();

        const foundRoles = await Role.find({_id: {$in: storedUser.roles}});
        
        // create token
        const token = jwt.sign({
            id: storedUser._id,
            name: storedUser.name,
            roles: foundRoles.map(role => role.name)
        }, Config.tokenSecret);

        Response.success(res, 201, 'Usuario creado', token);
    } catch (error) {
        Response.error(res);
    }
};

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// LOGIN
const signIn = async (req, res) => {
    try {
        // validaciones
        const { error } = schemaLogin.validate(req.body);

        if (error) return Response.error(res, new CreateError[400], error.details[0].message);

        const user = await User.findOne({ email: req.body.email }).populate();
        if (!user) return Response.error(res, new CreateError[400], "Usuario no existe");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return Response.error(res, new CreateError[400], "Contraseña no es correcta");

        const foundRoles = await Role.find({_id: {$in: user.roles}});

        // create token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            roles: foundRoles.map(role => role.name)
        }, Config.tokenSecret)

        Response.success(res, 200, 'Bienvenido', token);
    } catch (error) {
        Response.error(res);
    }
}

module.exports.AuthController = {
    signUp,
    signIn
}