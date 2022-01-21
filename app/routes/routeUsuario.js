var express = require('express');

var router = express.Router();

var usuario = require('../controllers/controller_usuario');

router.get('/',usuario.usuarios);

router.get('/miusuario',usuario.miUsuario);

router.get('/verperfil',usuario.verPerfil);

router.get('/verificarusuario',usuario.verificarUsuario)

router.post('/agregarusuario',usuario.addUsuario);


module.exports = router;