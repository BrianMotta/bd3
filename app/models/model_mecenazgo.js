var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mecenazgoSchema = new Schema({

    idMecenas: { type: String, required:true },
    
    idProductor: { type: String, required:true  },
    
    cantidadAbonada:{ type: Number, min:0, required:true  },
    
    fecha:{ type: Date, required:true  }
    
}, {versionKey: false});



module.exports =mongoose.model('Mecenazgo', mecenazgoSchema,'Mecenazgo');