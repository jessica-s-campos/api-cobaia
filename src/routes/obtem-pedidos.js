'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/mercado-livre/obtem-pedidos');

router.get('/', controller.get);

module.exports = router;