
var express = require('express');

var router = express.Router();

var venta = require('../controllers/controller_venta');

router.get('/milistaventas',venta.miListaVentas);

router.get('/milistacompras',venta.miListaCompras);

module.exports = router;