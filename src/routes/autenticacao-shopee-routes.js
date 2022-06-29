'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/shopee/autenticacao-controller');

router.get('/', controller.getAuthentication);
router.get('/success', controller.getAuthenticationSuccess);
router.get('/obter-item', controller.getItem);
router.get('/obter-preco-venda', controller.getPrecoVenda);

module.exports = router;