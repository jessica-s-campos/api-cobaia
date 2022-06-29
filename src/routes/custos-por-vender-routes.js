'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/custos-por-vender-controller');

router.get('/', controller.get);

module.exports = router;