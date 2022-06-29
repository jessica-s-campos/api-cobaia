'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/main-controller');

router.get('/', controller.get);
router.get('/start', controller.getStart);

module.exports = router;