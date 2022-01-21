var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({

  nombre: { type: String, required:true },

  categoria: { type: String , enum: ['Alimento','Higiene','Ropa','Hogar','Tecnologia','Otros','Arte'], required:true },

  precio:{type: Number , min:0.1 , required:true},

  descripcion:{type: String} ,

  unidadDeMedida:{type: String,enum: ['Paquete','Unidad','Kg'], required:true},

  calificacion:{type: Number, default:5},

  comentarios:[{cuerpo:String , fecha:Date}], 
  
  idVendedor: { type: String , required:true}

},{versionKey:false});


module.exports =mongoose.model('Producto', productSchema,'Producto');