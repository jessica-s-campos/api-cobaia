'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const indexRoutes = require('./routes/index-routes');
const productsRoutes = require('./routes/products-routes');
const sendEmailRoutes = require('./routes/send-email-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',indexRoutes);
app.use('/products',productsRoutes);
app.use('/sendemail',sendEmailRoutes);

module.exports = app;