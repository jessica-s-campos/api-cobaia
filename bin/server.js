'use strict'
const app = require('../src/app');
const https = require('https');
const debug = require('debug')('api:email');
const openssl = require('openssl-nodejs')
let fs = require('fs');
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/stormidb');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {  
  console.log("Connected mongodb successfully");
});

const nodemailer = require('nodemailer');

const options = { 
    key: fs.readFileSync("C:\\Users\\jessi\\server.key"),
    cert: fs.readFileSync("C:\\Users\\jessi\\server.cert")
  };

const server = https.createServer(options,app);
server.listen(process.env.PORT || 3000);
server.on('error',onError);
server.on('listening',onListening);

console.log('HTTPS - API rodando na porta '+process.env.PORT);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
        console.error(' requires elevated privileges');
        process.exit(1);

        case 'EADDRINUSE':
        console.error(' is already in use');
        process.exit(1);

        default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();    
    debug('Listening on ', process.env.PORT);
}
