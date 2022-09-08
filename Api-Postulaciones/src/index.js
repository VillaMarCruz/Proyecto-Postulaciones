const mongoose = require('mongoose');
const debug = require('debug')('app:main');

const { Config } = require('./config/index');
const { app } = require('./app')

mongoose.connect(Config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        debug('Conexión exitosa!!')
        app.listen(Config.port, ()=>{
            debug(`Servidor escuchando en el puerto ${Config.port}`);
        })
    })
    .catch(err => debug('Error en la conexión con MongoDB'))