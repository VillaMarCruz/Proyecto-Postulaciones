const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema;

const aspiranteSchema = new Schema(
    {
        documentoIdentidad: { type: String, required: false },
        libretaMilitar: { type: String, required: false },
        apellidos: { type: String, required: false },
        nombres: { type: String, required: false },
        fechaNacimiento: { type: Date, required: false },
        sexo: { type: String, required: false },
        estadoCivil: { type: String, required: false },
        conyuge: { type: String, required: false },
        discapacidad: { type: String, required: false },
        carnetConadis: { type: String, required: false },
        etnia: { type: String, required: false },
        nacionalidad: { type: String, required: false },
        correoPersonal: { type: String, required: false },
        correoAlternativo: { type: String, required: false },
        formacionAcademica: [
            {
                pais: { type: String, required: false },
                institucion: { type: String, required: false },
                titulo: { type: String, required: false },
                nivelFormacion: { type: String, required: false },
                duracion: { type: String, required: false },
                periodo: { type: String, required: false },
            }
        ],
        capacitaciones: [
            {
                pais: { type: String, required: false },
                evento: { type: String, required: false },
                auspiciante: { type: String, required: false },
                duracion: { type: String, required: false },
                certificado: { type: String, required: false },
                fechaInicio: { type: Date, required: false },
                fechaFin: { type: Date, required: false },
            }
        ],
        informacionLaboral: [
            {
                tipoInstitucion: { type: String, required: false },
                institucion: { type: String, required: false },
                unidad: { type: String, required: false },
                puesto: { type: String, required: false },
                fechaInicio: { type: Date, required: false },
                fechaFin: { type: Date, required: false },
                motivoSalida: { type: String, required: false }
            }
        ],
        referenciasPersonales:[
            {
                documentoIdentidad: { type: String, required: false },
                nombres: { type: String, required: false },
                puesto: { type: String, required: false },
                institucion: { type: String, required: false },
                direccionInstitucion: { type: String, required: false },
                telefono: { type: String, required: false },
                correo: { type: String, required: false }
            }
        ],
        postulaciones:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Cargo'
            }
        ],
        UserId: String
    },
    { timestamps: true }
);

aspiranteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Aspirante", aspiranteSchema);
