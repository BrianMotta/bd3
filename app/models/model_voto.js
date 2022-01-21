const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const votoSchema = new Schema({

  nombre: { type: String, required:true },

  puntuacion:{type: Number, max:5,min:1, required:true},
  
  idVendedor: { type: String , required:true},

  idVotante: { type: String , required:true},

},{versionKey:false});


module.exports =mongoose.model('Voto', votoSchema,'Voto');