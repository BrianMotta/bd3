var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ventaSchema = new Schema({

    idComprador: { type: String, required: true },

    idVendedor: { type: String, required: true },

    nombreProducto: { type: String, required: true },

    cantidad: { type: Number, min: 1, required: true },

    precio: { type: Number, min: 0.1, required: true },

    fecha: { type: Date, required: true },

}, { versionKey: false });


module.exports = mongoose.model('Venta', ventaSchema, 'Venta');