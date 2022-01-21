const express = require('express');

const router = express.Router();

const voto = require('../controllers/controller_voto');

router.get('/miVoto',voto.miVoto);

module.exports = router;