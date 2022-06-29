'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/mercado-livre/autenticacao-controller');

router.get('/', controller.getAuthentication);
router.get('/success', controller.getAuthenticationSuccess);
router.get('/obter-preco-venda', controller.getPrecoVenda);
router.get('/obter-item', controller.getItem);
router.get('/obter-dados-usuario', controller.getAccountUser);



module.exports = router;