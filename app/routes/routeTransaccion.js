var express = require('express');

var router = express.Router();

const transaccion = require('../controllers/controller_transaccion');

router.post('/compraproductoscanasta',transaccion.compraProductosCanasta);

router.delete('/eliminarmiproducto',transaccion.eliminarMiProducto);

router.delete('/eliminarusuario',transaccion.eliminarMiUsuario);

router.put('/modificarmiproducto',transaccion.modificaMiProducto);

router.post('/calificarproducto',transaccion.calificaProducto);

module.exports = router;