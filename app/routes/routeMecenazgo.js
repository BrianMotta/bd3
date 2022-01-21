var express = require('express');

var router = express.Router();

var mecenazgo = require('../controllers/controller_mecenazgo');

router.get('/milistamecenazgos',mecenazgo.miListaMecenazgos)

router.get('/milistamecenas',mecenazgo.miListaMecenas)

router.get('/perfilmecenazgo',mecenazgo.perfilMecenazgo)

router.post('/agregarmecenazgo',mecenazgo.addMecenazgo);



module.exports = router;