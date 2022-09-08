const debug = require('debug')('app:controladorCargo');
const CreateError = require('http-errors');

const Cargo = require('../models/cargo');
const Aspirante = require('../models/aspirante');
const { Response } = require('../common/response');

const getCargos = async (req, res) => {
    try {
        const cargos = await Cargo.find({});
        if (cargos.length === 0) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Listado de cargos vacantes', cargos);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const getCargoAspirante = async (req, res) => {
    try {
        const { params: { id } } = req;
        const cargo = await Cargo.findById(id);
        if (cargo.length === 0) {
            Response.error(res, new CreateError.NotFound());
        } else {
            const aspirante = await Aspirante.find({postulaciones: {$in: cargo._id}})
            Response.success(res, 200, 'Aspirantes', aspirante);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const searchCargos = async (req, res) => {
    try {
        const options = req.query;
        console.log(req.query);
        const cargos = await Cargo.find(options);
        if (cargos.length === 0) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Resultados', cargos);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const saveCargo = async (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new CreateError.BadRequest());
        } else {
            const newCargo = new Cargo({
                puesto: body.puesto,
                departamento: body.departamento,
                requisitos: body.requisitos,
                salario: body.salario
            });
            const storedCargo = await newCargo.save();
            Response.success(res, 201, 'Cargo agregado', storedCargo);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const updateCargo = async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const updatedCargo = await Cargo.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCargo) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Cargo actualizado', updatedCargo);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

const deleteCargo = async (req, res) => {
    try {
        const { params: { id } } = req;
        const removedCargo = await Cargo.findByIdAndRemove(id);
        if (!removedCargo) {
            Response.error(res, new CreateError.NotFound());
        } else {
            Response.success(res, 200, 'Cargo eliminado', removedCargo);
        }
    } catch (error) {
        debug(error);
        Response.error(res);
    }
}

module.exports.CargoController = {
    getCargos,
    getCargoAspirante,
    searchCargos,
    saveCargo,
    updateCargo,
    deleteCargo
}