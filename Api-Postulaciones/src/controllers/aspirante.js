const debug = require('debug')('app:controladorAspirante');
const CreateError = require('http-errors');

const Aspirante = require('../models/aspirante');
const User = require('../models/user');
const { Response } = require('../common/response');

const getAspirantes = async (req, res) => {
    try {
        const aspirantes = await Aspirante.find().populate('postulaciones');
        if (aspirantes.length === 0) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Lista de aspirantes', aspirantes)
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const getAspirante = async (req, res) => {
    try {
        const { params: { id } } = req;
        const aspirante = await Aspirante.findById(id).populate('postulaciones');
        if (!aspirante) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Aspirante', aspirante)
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const searchAspirante = async (req, res) => {
    try {
        const options = req.query;
        
        const aspirantes = await Aspirante.find(options).populate('postulaciones');
        Response.success(res, 200, 'Lista de aspirantes', aspirantes);
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const saveAspirante = async (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new CreateError.BadRequest());
        } else {
            const newAspirante = new Aspirante({
                documentoIdentidad: body.documentoIdentidad,
                libretaMilitar: body.libretaMilitar,
                apellidos: body.apellidos,
                nombres: body.nombres,
                fechaNacimiento: body.fechaNacimiento,
                sexo: body.sexo,
                estadoCivil: body.estadoCivil,
                conyuge: body.conyuge,
                discapacidad: body.discapacidad,
                carnetConadis: body.carnetConadis,
                etnia: body.etnia,
                nacionalidad: body.nacionalidad,
                correoPersonal: body.correoPersonal,
                correoAlternativo: body.correoAlternativo,
                formacionAcademica: body.formacionAcademica,
                capacitaciones: body.capacitaciones,
                informacionLaboral: body.informacionLaboral,
                referenciasPersonales: body.referenciasPersonales,
                postulaciones: body.postulaciones,
                UserId: body.UserId
            });
            const storedAspirante = await newAspirante.save();
            Response.success(res, 201, 'Aspirante agregado', storedAspirante);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const updateAspirante = async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const updatedAspirante = await Aspirante.findByIdAndUpdate(id, body, { new: true });
        if (!updatedAspirante) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Aspirante actualizado', updatedAspirante);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const deleteAspirante = async (req, res) => {
    try {
        const { params: { id } } = req;
        const removedAspirante = await Aspirante.findByIdAndRemove(id);
        if (!removedAspirante) {
            Response.error(res, new CreateError.NotFound());
        } else {
            await User.findByIdAndRemove(removedAspirante.UserId);
            Response.success(res, 200, 'Aspirante eliminado', removedAspirante);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const savePostulaciones = async (req, res) => {
    try {
        const { body } = req;
        let postulaciones = body.postulaciones;

        const applied = await Aspirante.findByIdAndUpdate({_id: body._id}, {$push: { "postulaciones": postulaciones }}, { new: true }); 
        if (!applied) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Postulación Exitosa', applied);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

module.exports.AspiranteController = {
    getAspirantes,
    getAspirante, 
    saveAspirante,
    savePostulaciones,
    updateAspirante,
    deleteAspirante,
    searchAspirante
}