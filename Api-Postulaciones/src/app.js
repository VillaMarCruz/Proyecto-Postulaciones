const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { AspiranteAPI } = require('./routes/aspirante');
const { CargoAPI } = require('./routes/cargo');
const { AuthAPI } = require('./routes/auth');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

AuthAPI(app);
AspiranteAPI(app);
CargoAPI(app);

module.exports.app = app;




