const mongoose = require('mongoose');

const producto = mongoose.model('Producto');

const voto = mongoose.model('Voto');

//Devuelve todos los productos de la coleccion
exports.productos = async function (req, res) {
  try {
    const productos = await producto.aggregate(
      [{ "$lookup": { "from": "Usuario", "localField": "idVendedor", "foreignField": "ruc", "as": "Usuario" } },
      { "$project": { "_id": 0, "Usuario": { "_id": 0, "clave": 0, "correo": 0, "telefono": 0, "ruc": 0 } } },
      { "$unwind": { "path": "$Usuario", "preserveNullAndEmptyArrays": true } },
      { "$project": { "nombreVendedor": "$Usuario.nombre", "idVendedor": 1, "nombre": 1, "categoria": 1, "precio": 1, "unidadDeMedida": 1, "calificacion": 1 } }]);
    res.json(productos);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Mis productos
exports.miListaProductos = async function (req, res) {
  try {
    const listaProductos = await producto.find({ 'idVendedor': req.query.idVendedor }, { "_id": 0, "nombre": 1, "categoria": 1, "calificacion": 1 });
    res.json(listaProductos);
  }
  catch (error) {
    res.status(500).send(error);
  }
};

//Muestra los productos del perfil
exports.perfilProductos = async function (req, res) {
  try {
    const listaProductos = await producto.find({ 'idVendedor': req.query.idVendedor }, { "_id": 0, "nombre": 1, "categoria": 1, "calificacion": 1, "precio": 1, "unidadDeMedida": 1, });
    if (listaProductos.length > 0)
      res.json(listaProductos);
    else
      res.status(500).send(error);
  }
  catch (error) {
    res.status(500).send(error);
  }
};

//Recomendaciones
exports.recomendaciones = async function (req, res) {
  const votos = new Map();
  const medias = new Map();
  const sim = new Map();
  const resultados = new Map();
  var funciono = true;
  var p = [];
  var rec = [];
  try {
    const listaProductosVoto = await voto.aggregate([{ "$group": { "_id": { "idVendedor": "$idVendedor", "nombre": "$nombre" } } }, { "$project": { "_id": 0, "idVendedor": "$_id.idVendedor", "nombre": "$_id.nombre" } }]);
    const listaVotantes = await voto.aggregate([{ "$group": { "_id": { "idVotante": "$idVotante" } } }, { "$project": { "_id": 0, "idVotante": "$_id.idVotante" } }]);
    for (let x of listaVotantes) {
      var media = 0
      var cantidad = 0
      for (let y of listaProductosVoto) {
        const listaMediaVotos = await voto.findOne({ "nombre": y.nombre, "idVendedor": y.idVendedor, "idVotante": x.idVotante }, { "_id": 0, "puntuacion": 1 })
        if (listaMediaVotos!=null) {
          media = media + listaMediaVotos.puntuacion
          cantidad++
        }
      }
      medias.set(JSON.stringify({ idVotante: x.idVotante }), media / cantidad);
    }

    for (let x of listaVotantes) {
      for (let y of listaProductosVoto) {
        const valor = await voto.findOne({ "nombre": y.nombre, "idVendedor": y.idVendedor, "idVotante": x.idVotante }, { "puntuacion": 1, "_id": 0 });
        if (valor != null)
          votos.set(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: x.idVotante }), valor.puntuacion - medias.get(JSON.stringify({ idVotante: x.idVotante })))
        else
          votos.set(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: x.idVotante }), 0)
        
      }
    }
    for (let y of listaProductosVoto) {
      const valor = await voto.findOne({ "nombre": y.nombre, "idVendedor": y.idVendedor, "idVotante": req.query.idVendedor }, { "puntuacion": 1, "_id": 0 });
      if (valor == null)
        p.push(y);
    }
    for (let x of listaVotantes) {
      var sumatoria1 = 0;
      var sumatoria2 = 0;
      var sumatoria3 = 0;
      for (let y of listaProductosVoto) {
        if (x.idVotante != req.query.idVendedor) {
          sumatoria1 = votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: req.query.idVendedor })) * votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: x.idVotante })) + sumatoria1;
          sumatoria2 = votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: req.query.idVendedor })) * votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: req.query.idVendedor })) + sumatoria2;
          sumatoria3 = votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: x.idVotante })) * votos.get(JSON.stringify({ nombre: y.nombre, idVendedor: y.idVendedor, idVotante: x.idVotante })) + sumatoria3;
        }
      }

      if (x.idVotante != req.query.idVendedor && !isNaN(sumatoria1 / (Math.sqrt(sumatoria2) * Math.sqrt(sumatoria3))))
        sim.set(JSON.stringify({ idUsuario: req.query.idVendedor, idVotante: x.idVotante }), sumatoria1 / (Math.sqrt(sumatoria2*sumatoria3)))

      else {
        if (x.idVotante != req.query.idVendedor) {
          funciono = false
          break
        }
      }
    }
    if (funciono) {
      for (let x of p) {
        var result = 0
        var result2 = 0
        for (let y of listaVotantes) {
          if (y.idVotante != req.query.idVendedor) {
            result = sim.get(JSON.stringify({ idUsuario: req.query.idVendedor, idVotante: y.idVotante })) * votos.get(JSON.stringify({ nombre: x.nombre, idVendedor: x.idVendedor, idVotante: y.idVotante })) + result
            result2 = Math.abs(sim.get(JSON.stringify({ idUsuario: req.query.idVendedor, idVotante: y.idVotante }))) + result2
          }
        }

        if (!isNaN(result / result2))
          resultados.set(JSON.stringify({ nombre: x.nombre, idVendedor: x.idVendedor, idVotante: req.query.idVendedor }), result / result2)
        else {
          funciono = false
          break
        }
      }
    }
    if (funciono) {
      for (let x of p) {
        const v = resultados.get(JSON.stringify({ nombre: x.nombre, idVendedor: x.idVendedor, idVotante: req.query.idVendedor }))
        if (v >= 0 && rec.length <= 20) {
          const pro = await producto.findOne({ "nombre": x.nombre, "idVendedor": x.idVendedor }, { "_id": 0, "idVendedor": 1, "nombre": 1, "categoria": 1, "precio": 1, "unidadDeMedida": 1, "calificacion": 1 })
          if (pro)
            rec.push(pro)
        }
      }
    }
    console.log(votos)
    console.log(medias)
    console.log(sim)
    console.log(resultados)
    console.log(p)
    res.json(rec);
  }
  catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
};

//El producto que se va a modificar
exports.productoModificar = async function (req, res) {
  try {
    const productoModificar = await producto.findOne({ 'nombre': req.query.nombre, 'idVendedor': req.query.idVendedor }, { "_id": 0, "nombre": 1, "categoria": 1, "precio": 1, "descripcion": 1, "unidadDeMedida": 1 });
    if (productoModificar)
      res.json(productoModificar);
    else
      res.status(500).send(error);
  }
  catch (error) {
    res.status(500).send(error);
  }
};

//Agrega mi producto
exports.add = async function (req, res) {
  const session = await mongoose.startSession();
  try {
    const producto = mongoose.model('Producto');
    const voto = mongoose.model('Voto');
    await session.withTransaction(
      async () => {
        const producto_nuevo = new producto(req.body);
        await producto_nuevo.save({ session });
        const voto_nuevo = new voto({ "idVendedor": req.body.idVendedor, "nombre": req.body.nombre, "puntuacion": 5, "idVotante": req.body.idVendedor });
        await voto_nuevo.save({ session });
      })
    res.json(req.body)
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
  finally {
    await session.endSession();
  }
};

//Detalles del producto
exports.detallesProducto = async function (req, res) {
  try {
    const productoDetalles = await producto.aggregate(
      [{ "$match": { 'nombre': req.query.nombre, 'idVendedor': req.query.idVendedor } },
      { "$lookup": { "from": "Usuario", "localField": "idVendedor", "foreignField": "ruc", "as": "Usuario" } },
      { "$project": { "_id": 0, "Usuario": { "_id": 0, "clave": 0, "correo": 0, "telefono": 0, "ruc": 0 } } },
      { "$unwind": { "path": "$Usuario", "preserveNullAndEmptyArrays": true } },
      { "$project": { "nombreVendedor": "$Usuario.nombre", "nombre": 1, "categoria": 1, "precio": 1, "descripcion": 1, "unidadDeMedida": 1, "calificacion": 1, "comentarios": { "$map": { "input": "$comentarios", "as": "c", "in": { "cuerpo": "$$c.cuerpo", "fecha": { "$dateToString": { "format": "%d-%m-%Y", "date": "$$c.fecha" } } } } } } }]);
    if (productoDetalles.length > 0)
      res.json(productoDetalles[0]);
    else
      res.status(500).send(error);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Modifica mi producto y agrega comentario
exports.agregarComentario = async function (req, res) {
  try {
    const productoPrevio = await producto.findOne({ "nombre": req.query.nombre, "idVendedor": req.query.idVendedor })
    if (productoPrevio) {
      productoPrevio.comentarios.push(req.body.comentario)
      productoPrevio.save();
      res.json(productoPrevio);
    }
    else
      res.status(500).send(error);
  }
  catch (error) {
    res.status(500).send(error);
  }
};