var mongoose = require('mongoose');

const mecenazgo = mongoose.model('Mecenazgo');


//Los mecenazgos que realizo mi usuario
exports.miListaMecenazgos = async function (req, res) {

  try {
    const misMecenazgos = await mecenazgo.aggregate(
      [{ "$match": { "idMecenas": req.query.idMecenas } },
      { "$lookup": { "from": "Usuario", "localField": "idProductor", "foreignField": "ruc", "as": "Usuario" } },
      { "$project": { "_id": 0, "Usuario": { "_id": 0, "clave": 0, "correo": 0, "telefono": 0, "ruc": 0 } } },
      { "$unwind": { "path": "$Usuario", "preserveNullAndEmptyArrays": true } },
      { "$project": { "nombreProductor": "$Usuario.nombre", "idProductor": 1, "cantidadAbonada": 1, "fechaCadena": { "$dateToString": { "date": "$fecha", "format": "%d-%m-%Y" } } } }]);
    res.json(misMecenazgos);
  }
  catch (error) {
    res.status('500').send(error);
  }

};

//Los mecenazgos que realizo mi usuario
exports.miListaMecenas = async function (req, res) {

  try {
    const misMecenazgos = await mecenazgo.aggregate(
      [{ "$match": { "idProductor": req.query.idMecenas } },
      { "$lookup": { "from": "Usuario", "localField": "idMecenas", "foreignField": "ruc", "as": "Usuario" } },
      { "$project": { "_id": 0, "Usuario": { "_id": 0, "clave": 0, "correo": 0, "telefono": 0, "ruc": 0 } } },
      { "$unwind": { "path": "$Usuario", "preserveNullAndEmptyArrays": true } },
      { "$group": { "_id": { "idMecenas": "$idMecenas", "nombreMecenas": "$Usuario.nombre" }, "cantidadAbonada": { "$sum": "$cantidadAbonada" } } },
      { "$project": { "idMecenas": "$_id.idMecenas", "nombreMecenas": "$_id.nombreMecenas", "cantidadAbonada": 1 } },]);
    res.json(misMecenazgos);
  }
  catch (error) {
    res.status('500').send(error);
  }

};

//Los mecenazgos que realizo un usuario
exports.perfilMecenazgo = async function (req, res) {

  try {
    const misMecenazgos = await mecenazgo.aggregate(
      [{ "$match": { "idMecenas": req.query.idMecenas } },
      { "$group": { "_id": { "idProductor": "$idProductor" }, "cantidadAbonada": { "$sum": "$cantidadAbonada" } } },
      { "$project": { "idProductor": "$_id.idProductor", "cantidadAbonada": 1 } },
      { "$lookup": { "from": "Usuario", "localField": "idProductor", "foreignField": "ruc", "as": "Usuario" } },
      { "$project": { "_id": 0, "Usuario": { "_id": 0, "clave": 0, "correo": 0, "telefono": 0, "ruc": 0 } } },
      { "$unwind": { "path": "$Usuario", "preserveNullAndEmptyArrays": true } },
      { "$project": { "idProductor": 1, "cantidadAbonada": 1, "nombreProductor": "$Usuario.nombre" } }
      ]);
    if (misMecenazgos.length > 0)
      res.json(misMecenazgos);
    else
      res.status('500').send(error);
  }
  catch (error) {
    res.status('500').send(error);
  }

};

//Crea el mecenazgo
exports.addMecenazgo = function (req, res) {

  var mecenazgo_nuevo = new mecenazgo(req.body);
  console.log(req.body);
  mecenazgo_nuevo.save(function (err, p) {

    if (err)

      res.status(500).send(err);

    res.json(p);

  });
};


