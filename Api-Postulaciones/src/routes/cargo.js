const express = require("express");
const { CargoController } = require("../controllers/cargo");
const { AuthMiddleware } = require('../middleware/validate-token');

const router = express.Router();

module.exports.CargoAPI = (app) => {
    router
        .get('/all',AuthMiddleware.verifyToken, CargoController.getCargos)
        .get('/search',AuthMiddleware.verifyToken, CargoController.searchCargos) // http://localhost:3800/api/aspirantes
        .get('/:id',AuthMiddleware.verifyToken, CargoController.getCargoAspirante)
        .post('/create',[AuthMiddleware.verifyToken, AuthMiddleware.isAdmin], CargoController.saveCargo)
        .put('/update/:id', [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin], CargoController.updateCargo)
        .delete('/delete/:id',[AuthMiddleware.verifyToken, AuthMiddleware.isAdmin], CargoController.deleteCargo)
    app.use('/api/cargos', router)
};