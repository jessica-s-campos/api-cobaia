'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');
<<<<<<< HEAD
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
var Keygrip = require('keygrip')

const indexRoutes = require('./routes/index-routes');
const pedidos = require('./routes/obtem-pedidos');
const productsRoutes = require('./routes/products-routes');
//const sendEmailRoutes = require('./routes/send-email-routes');
const custosPorVenderRoutes = require('./routes/custos-por-vender-routes');
const leitor = require('./routes/leitor-destaques-ig');
const leitor_notinha = require('./routes/leitor-notinha');
const autenticacao_shopee = require('./routes/autenticacao-shopee-routes');
const autenticacao_meli = require('./routes/autenticacao-meli-routes');
const main = require('./routes/main-routes');

app.use('/',indexRoutes);
app.use('/leitor-destaques-ig',leitor);
app.use('/leitor-notinha',leitor_notinha);
app.use('/autenticacao/shopee',autenticacao_shopee);
app.use('/autenticacao/meli',autenticacao_meli);
app.use('/main',main);

app.use(cookieSession({
    name: 'cobaiaSession',
    keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(cookieParser({
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    //expires: new Date('01 12 2021'),
}))

=======

const indexRoutes = require('./routes/index-routes');
const productsRoutes = require('./routes/products-routes');
//const sendEmailRoutes = require('./routes/send-email-routes');
const custosPorVenderRoutes = require('./routes/custos-por-vender-routes');

app.use('/',indexRoutes);
//app.use('/products',productsRoutes);
//app.use('/sendemail',sendEmailRoutes);
app.use('/custos-por-vender',custosPorVenderRoutes);
>>>>>>> d64b717bb864b1c8ded85557301c2bc44f85cae2
app.use(cors());
module.exports = app;