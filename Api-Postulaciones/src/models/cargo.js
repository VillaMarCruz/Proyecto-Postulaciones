const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema;

const cargoSchema = new Schema({
    puesto: String,
    departamento: String,
    requisitos: Array,
    salario: Number
},
{ timestamps: true }
);

module.exports = mongoose.model('Cargo', cargoSchema);