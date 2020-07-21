'use strict'

const nodemailer = require('nodemailer');
const crypto = require("crypto-js");
const fs = require('fs');
const path = require('path');
const db = require('../db')

let dupla_quebra_linha = '\r\n' + '\r\n';
let remetente = {};

function Send(from, to, subject, text) {
    var data = new Date();

    var cabecalho = `Data/Hora do envio : ${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}  ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    
    var texto = cabecalho + dupla_quebra_linha + 'Mensagem:' + dupla_quebra_linha + `${text}`;

    let emailASerEnviado = {
        from: from,
        to: to,
        subject: subject,
        text: texto,
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

exports.post = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    db.query(`select * from cfgemails where email = '${req.body.user}'`)
    .then( result => {   

        if(result.rows.length > 0){
            
            let infos = result.rows[0];
            
            Configure(infos.host, infos.port, infos.secure, req.body.user, infos.password);
        
            Send(req.body.from, req.body.to, req.body.subject, req.body.text)
            .then((message) => res.status(200).send({message : message, dados : req.body}))
            .catch((error) => {        
                res.status(502).send({ retorno : error});   
            });  

        }
        else{
            res.status(502).send({ message : `dados do usuário ${req.body.user} não foram encontrados para envio de e-mail`});   
            return; 
        }
            
    })
    .catch(err => {
        res.status(502).send({ message : `Ocorreu um erro: ${err}`});   
    })

   
}



