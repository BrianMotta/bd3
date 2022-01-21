const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    
    nombre : {type: String, required:true},

    clave:{type: String, required:true},

    ruc : {type: String, required: true},

    tipo:{type: String, enum: ['Persona Natural','Empresa'], required: true},

    correo : {type: String, required: true},
    
    telefono : {type: Number, required:true},
    
}, {versionKey: false});

module.exports=usuarioSchema;
