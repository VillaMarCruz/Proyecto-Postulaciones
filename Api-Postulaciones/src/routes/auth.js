const express = require('express');
const router = express.Router();

const {AuthController} = require('../controllers/auth')

module.exports.AuthAPI = (app) => {
    router
        .post('/nuevo', AuthController.signUp)
        .post('/login', AuthController.signIn)
    app.use('/api/user', router)
}
