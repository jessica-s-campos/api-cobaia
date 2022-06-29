'use strict'

const { redirect } = require('express/lib/response')
var https = require('https')
const axios = require('axios');

const CredenciaisRepository = require("../../db/repositories/CredenciaisRepository");
const Credencial = require('../../db/domain/Credencial');
const AccountUserRepository = require("../../db/repositories/AccountUserRepository");
const UserAccount = require('../../db/domain/UserAccount');

var app_id = 1354321273735197;
var client_secret = "LHPaHLrab9oRTfeeyjT1oLpQHAdMaIwy"
var host = "https://auth.mercadolivre.com.br"
var redirect_url = "https://localhost:3000/autenticacao/meli/success"

var user_test = {             
    id:0,
    nickname:"",
    password:"",
    site_status:""
}

var credenciais;
var accountUser;
var CredenciaisRepo = new CredenciaisRepository();
var AccountUserRepo = new AccountUserRepository();

exports.getAuthentication = async (req, res) => {    
    credenciais = await CredenciaisRepo.listBy({ marketplace : "meli"});   
    
    credenciais = credenciais[0];  

    console.log(`mercado livre\nverificando credenciais`)
    
    if(credenciais == undefined){
        console.log('obtem autenticacao')
        ObtemAutorizacao(res)
    }
    else  if(new Date().getTime() >= credenciais.expire_time){
        console.log(`credenciais ${credenciais.marketplace} expiradas`)    
        getToken(credenciais.refresh_token, res, true);
    }
    else{
        console.log(`credenciais ${credenciais.marketplace} válidas`)           
        res.redirect(`https://localhost:3000/main/start`) 
    }       
    
}

function ObtemAutorizacao(res){
    let path = "/authorization";
    res.header("Access-Control-Allow-Origin", "*");	
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');

    let url = host + path + "?response_type=code&client_id="+app_id+"&redirect_uri="+redirect_url;    
    https.get(url, (response) => {         
        //res.json({"url" : response.headers.location});               
        res.redirect(response.headers.location)        
    });
}

exports.getAuthenticationSuccess = (req, res) => {
    console.log('getAuthenticationSuccess meli')

    //obter token
    getToken(req.query.code, res);

}

function getToken(code, res, refresh){
    console.log(`getToken meli`)
    console.log(`credenciais ${credenciais}`)
    let path = 'https://api.mercadolibre.com/oauth/token';
    let body = {};    

    if(refresh){
        body = { 
            'grant_type':'refresh_token', 
            'client_id' : app_id,
            'client_secret' : client_secret, 
            'refresh_token' : credenciais.refresh_token};      
    }else{
        body = { 
            'grant_type':'authorization_code', 
            'client_id' : app_id,
            'client_secret' : client_secret, 
            'code' : code, 
            'redirect_uri' : redirect_url };      
    }
 

    var options = {
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    let url = path;

    axios.post(url,body,options)
    .then((rex)=>
    {                             
        let requested_in = new Date();
        let expire_time = new Date().setSeconds(requested_in.getSeconds() + rex.data.expires_in);   
        
        if(refresh)
            CredenciaisRepo.excluir({ marketplace : "meli"})
        
            CredenciaisRepo.adicionar(
                new Credencial("meli",rex.data.refresh_token,
                rex.data.expires_in,
                rex.data.user_id,
                expire_time,
                rex.data.access_token,
                app_id,
                client_secret,
                redirect_url)
            )
        
        
        credenciais = CredenciaisRepo.listBy({ marketplace : "meli"}); 

        getAccountUser(req,res);

        //getUserTest(req,res)

        res.redirect(`/main/start`)
                
    });   
}

exports.getPrecoVenda = (req, res) => {
    console.log('getPrecoVenda meli')     
    let url = 'https://api.mercadolibre.com/items/'+req.query.item
    var config = {       
        headers: { 
          'Authorization': 'Bearer APP_USR-1354321273735197-061411-fcdc64e074968231a810fcc84afd9ee2-1142653823', 
        }
      };

    axios.get(url,config).then((response) => {         
        res.json({"price" : response.data.price});                       
    });
}


exports.getItem = (req, res) => {
    console.log('getItem meli')     
    let url = 'https://api.mercadolibre.com/items/'+req.query.item
    var config = {       
        headers: { 
          'Authorization': 'Bearer APP_USR-1354321273735197-061411-fcdc64e074968231a810fcc84afd9ee2-1142653823', 
        }
      };

    axios.get(url,config).then((response) => {         
        res.json({"" : response.data});                       
    });
}

exports.getUserTest = (req, res) => {
    /*
    id: 1142653823,
    nickname: 'TETE2582824',
    password: 'qatest7064',
    site_status: 'active',
    email: 'test_user_35230828@testuser.com' */


    console.log('getUserTest meli')    
    let url = "https://api.mercadolibre.com/users/test_user";

    let body = { 'site_id':'MLB' };       

    var options = {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+credenciais.access_token
        }
    };

    axios.post(url,body,options)
    .then((rex)=>
    {                             
        console.log(rex.data)
        user_test.id = rex.data.id;      
        user_test.nickname = rex.data.nickname;      
        user_test.password = rex.data.password;      
        user_test.site_status = rex.data.site_status;      
    
    });   
    
}

exports.getAccountUser = (req, res) => {

    console.log('getAccountUser meli')    
    let url = "https://api.mercadolibre.com/users/me";

    var options = {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+credenciais.access_token
        }
    };

    axios.get(url,options)
    .then((rex)=>
    {                             
        AccountUserRepo.adicionar(
            new UserAccount(rex.data.id,rex.data.nickname,rex.data.first_name,rex.data.last_name)
        )       
    
    });   
    
}




  



