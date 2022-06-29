'use strict'
const app = require('../src/app');
<<<<<<< HEAD
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
const port = normalizePort(process.env.PORT || 3000);

const options = { 
    key: fs.readFileSync("C:\\Users\\jessi\\server.key"),
    cert: fs.readFileSync("C:\\Users\\jessi\\server.cert")
  };


app.set('port', port);

const server = https.createServer(options,app);
=======
const http = require('http');
const debug = require('debug')('api:email');

const nodemailer = require('nodemailer');

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);


>>>>>>> d64b717bb864b1c8ded85557301c2bc44f85cae2
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);

<<<<<<< HEAD
console.log('HTTPS - API rodando na porta '+port);
=======
console.log('API rodando na porta '+port);
>>>>>>> d64b717bb864b1c8ded85557301c2bc44f85cae2

function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);

        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);

        default:
        throw error;
    }
}

<<<<<<< HEAD

=======
>>>>>>> d64b717bb864b1c8ded85557301c2bc44f85cae2
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
<<<<<<< HEAD
}
=======
}
>>>>>>> d64b717bb864b1c8ded85557301c2bc44f85cae2
