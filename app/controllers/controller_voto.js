const mongoose = require('mongoose');

const voto = mongoose.model('Voto');

exports.miVoto =async function(req, res) {
    try{
      const v=await voto.findOne({'nombre':req.query.nombre,'idVendedor':req.query.idVendedor,'idVotante':req.query.idVotante},{'puntuacion':1});
      res.json(v)
    }
    catch(error){
      res.status(500).send(error)
    }
};
  