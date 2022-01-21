
var express = require('express');

var router = express.Router();

var product = require('../controllers/controller_producto');

router.get('/',product.productos);

router.get('/milistaproductos',product.miListaProductos);

router.get('/perfilproductos',product.perfilProductos);

router.get('/recomendaciones',product.recomendaciones);

router.get('/productomodificar',product.productoModificar);

router.get('/detallesproducto',product.detallesProducto);

router.post('/agregarmiproducto',product.add);

router.put('/agregarcomentario',product.agregarComentario);

module.exports = router;