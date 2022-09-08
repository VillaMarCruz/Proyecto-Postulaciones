const express = require("express");
const { AspiranteController } = require("../controllers/aspirante");
const { AuthMiddleware } = require('../middleware/validate-token');

const router = express.Router();

module.exports.AspiranteAPI = (app) => {
    router
        .get('/all', [AuthMiddleware.verifyToken], AspiranteController.getAspirantes)
        .get('/detail/:id', [AuthMiddleware.verifyToken], AspiranteController.getAspirante)
        .get('/search', [AuthMiddleware.verifyToken], AspiranteController.searchAspirante) // http://localhost:3800/api/aspirantes
        .post('/create', AuthMiddleware.verifyToken, AspiranteController.saveAspirante)
        .post('/register-postulacion', AuthMiddleware.verifyToken, AspiranteController.savePostulaciones)
        .put('/update/:id', AuthMiddleware.verifyToken, AspiranteController.updateAspirante)
        .delete('/delete/:id',AuthMiddleware.verifyToken, AspiranteController.deleteAspirante)
    app.use('/api/aspirantes', router)
};