'use strict'

const nodemailer = require('nodemailer');
const crypto = require("crypto-js");
const fs = require('fs');
const path = require('path');

let remetente = {};

function Send(from, to, subject, text) {
    
    let emailASerEnviado = {
        from: from,
        to: to,
        subject: subject,
        text: text,
    };

    return new Promise((resolve,reject) => {
              
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                reject(error);
            } else {
                resolve('Email enviado com sucesso.');
            }
        });

    })

}

function Configure(host, port, secure, user, pass){

    remetente = nodemailer.createTransport({
        host: host,   
        port: port,
        secure: secure,
        auth:{
            user: user,
            pass: pass 
        }
    });
}

function getInfos(user){
    
    let rawdata = fs.readFileSync(path.join(__dirname,'../../config.json'));

    let emails = Array.from(JSON.parse(rawdata).emails);
    
    let infos = emails.filter((o) => o.email === user)[0];
    
    return infos;
}

exports.post = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var infos = getInfos(req.body.user);

    if(!infos){
        res.status(502).send({ message : `dados do usuário ${req.body.user} não foram encontrados para envio de e-mail`});   
    }            

    var host = infos.host;
    var port = infos.port; 
    var pass = infos.pass;
    var secure = infos.secure;

    var user = req.body.user;
    var nome = req.body.name;
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var text = req.body.text;
    
    Configure(host, port, secure, user, pass);

    Send(from, to, subject, text)
    .then((message) => res.status(200).send({message : message, dados : req.body}))
    .catch((error) => {        
        res.status(502).send({ retorno : error});   
    });    
}



