// Generated by https://quicktype.io

export interface FechAllAspiranteResponse {
  message: string;
  results:    Aspirante[];
}

export interface FechAllCargosResponse {
  message: string;
  results:    Cargos[];
}

export interface FechAllAspiranteResponseDetail {
  message: string;
  results:    Aspirante;
}

export interface FechAllCargosResponseDetail {
  message:    string;
  results:    Cargos;
}

export interface Aspirante {
  _id:                   string;
  documentoIdentidad:    string;
  libretaMilitar:        string;
  apellidos:             string;
  nombres:               string;
  fechaNacimiento:       string;
  sexo:                  string;
  estadoCivil:           string;
  conyuge:               string;
  discapacidad:          string;
  carnetConadis:         string;
  etnia:                 string;
  nacionalidad:          string;
  correoPersonal:        string;
  correoAlternativo:     string;
  formacionAcademica:    FormacionAcademica[];
  capacitaciones:        Capacitaciones[];
  informacionLaboral:    InformacionLaboral[];
  referenciasPersonales: ReferenciasPersonales[];
  postulaciones:         Cargos[];
  UserId:                string;
  createdAt:             string;
  updatedAt:             string;
}
export interface Cargos {
  _id:                   string;
  puesto:                string,
  departamento:          string,
  requisitos:            string[],
  salario:               number,
  createdAt:             string;
  updatedAt:             string;
}

export interface Capacitaciones {
  pais:        string;
  evento:      string;
  auspiciante: string;
  duracion:    string;
  certificado: string;
  fechaInicio: string;
  fechaFin:    string;
  _id:         string;
}

export interface FormacionAcademica {
  _id:            string;
  pais:           string;
  institucion:    string;
  titulo:         string;
  nivelFormacion: string;
  duracion:       string;
  periodo:        string;
}

export interface InformacionLaboral {
  _id:             string;
  tipoInstitucion: string;
  institucion:     string;
  unidad:          string;
  puesto:          string;
  fechaInicio:     string;
  fechaFin:        string;
  motivoSalida:    string;
}

export interface ReferenciasPersonales {
  _id:                  string;
  documentoIdentidad:   string;
  nombres:              string;
  puesto:               string;
  institucion:          string;
  direccionInstitucion: string;
  telefono:             string;
  correo:               string;
}
