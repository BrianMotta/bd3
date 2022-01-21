const mongoose = require('mongoose');

const usuarioSchema = require('../models/model_usuario');

const usuario = mongoose.model('Usuario');

//Muestra todos los usuarios
exports.usuarios = async function (req, res) {

  try {
    const usuarios = await usuario.find({}, { '_id': 0, 'clave': 0 })
    res.json(usuarios)
  }
  catch (error) {
    res.status.send(error)
  }

};


//Verifica si usuario existe
exports.verificarUsuario = async function (req, res) {

  const db = mongoose.createConnection('mongodb+srv://AccesoUsuario:12345@cluster0.aw6la.mongodb.net/bd3?retryWrites=true&w=majority');
  const UsuarioVerificado = db.model('Usuario', usuarioSchema, 'Usuario');

  try {
    const usuario = await UsuarioVerificado.findOne({ 'correo': req.query.usuario, 'clave': req.query.clave }, { '_id': 0, 'ruc': 1 });
    if (usuario)
      res.json(usuario);
    else
      res.status('500').send(error);
    await db.close();
  }
  catch (error) {
    res.status('500').send(error);
    await db.close();
  }

}


//Muestra mi usuario
exports.miUsuario = async function (req, res) {
  try {
    const user = await usuario.findOne({ 'ruc': req.query.ruc }, { '_id': 0, 'clave': 0 });
    if (user)
      res.json(user)
    else
      res.status(500).send(error)
  }
  catch (error) {
    res.status(500).send(error)
  }
};

//Muestra el perfil de un usuario
exports.verPerfil = async function (req, res) {
  try {
    const user = await usuario.findOne({ 'ruc': req.query.ruc }, { '_id': 0, 'clave': 0 });
    if (user)
      res.json(user)
    else
      res.status(500).send(error)
  }
  catch (error) {
    res.status(500).send(error)
  }
};

//Agrega un usuario a la base de datos
exports.addUsuario = async function (req, res) {

  const db = mongoose.createConnection('mongodb+srv://CreadorUsuario:12345@cluster0.aw6la.mongodb.net/bd3?retryWrites=true&w=majority');
  const UsuarioCreado = db.model('Usuario', usuarioSchema, 'Usuario');
  const usuario_nuevo = new UsuarioCreado(req.body);
  try {
    await usuario_nuevo.save();
    res.json(usuario_nuevo);
    await db.close();
  }
  catch (error) {
    res.status('500').send(error);
    await db.close();
  }
};


