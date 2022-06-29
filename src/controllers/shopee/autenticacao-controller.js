'use strict'

const { redirect } = require('express/lib/response')
const crypto = require('crypto')
var https = require('https')
const axios = require('axios');

const CredenciaisRepository = require("../../db/repositories/CredenciaisRepository");
const Credencial = require('../../db/domain/Credencial');
const AccountUserRepository = require("../../db/repositories/AccountUserRepository");
const UserAccount = require('../../db/domain/UserAccount');

var partnerID = 1007898
var partnerKey = "c207fa504273b078d690031b67b70adad5b083e0c29c10f392535978edd44257"
var host = "https://partner.test-stable.shopeemobile.com"
var redirect_url = "https://localhost:3000/autenticacao/shopee/success"   

var credenciais;

exports.getAuthentication = async (req, res) => {    
    credenciais = await List({ marketplace : "shopee"}); 
    credenciais = credenciais[0];  

    console.log(`shopee\nverificando credenciais`)
    
    if(credenciais == undefined){
        console.log('obtem autenticacao')
        ObtemAutenticacao(req, res)
    }
    else  if(new Date().getTime() >= credenciais.expire_time){
        console.log(`credenciais ${credenciais.marketplace} expiradas`)    
        getToken(credenciais.refresh_token, credenciais.shop_id, res, true);
    }
    else{
        console.log(`credenciais ${credenciais.marketplace} válidas`)           
        res.redirect(`https://localhost:3000/main/start`) 
    }   
}

exports.getAuthenticationSuccess = (req, res) => {
    //obter token
    getToken(req.query.code, req.query.shop_id, res);
    
}

function Timestamp(){
    return Math.round(new Date().getTime()/1000);
}

function ObtemAutenticacao(req, res){
    let path = "/api/v2/shop/auth_partner"
    let timestamp = Timestamp();        
    let signature = createSignature(path,timestamp);
    let url = host+path+"?partner_id="+partnerID+"&timestamp="+timestamp+"&sign="+signature+"&redirect="+redirect_url;

    https.get(url, (response) => {                     
        res.redirect(response.headers.location)
    });

}

function getToken(code, shop_id, res, refresh){
    let path = refresh ? '/api/v2/auth/access_token/get' : "/api/v2/auth/token/get" ;     
    let timestamp = Timestamp();    
    let signature = createSignature(path,timestamp);
    let options = { headers : { 'Content-Type' : 'application/json' } };
    let url = host+path+"?partner_id="+partnerID+"&timestamp="+timestamp+"&sign="+signature;
    let body = {};  

    if(refresh)
        body = { 'refresh_token' : credenciais.refresh_token.toString() ,'partner_id' : partnerID , 'shop_id' : shop_id };  
    else
        body = { 'code' : code ,'shop_id' : parseInt(shop_id), 'partner_id' : partnerID }; 
        
    axios.post(url,body,options)
    .then((rex)=>
    {                  
        let requested_in = new Date();
        let expire_time = new Date().setSeconds(requested_in.getSeconds() + rex.data.expire_in);          
        
        if(refresh)
            CredenciaisRepository.excluir({ marketplace : "shopee"})
        
            CredenciaisRepository.adicionar(
                new Credencial("shopee",rex.data.refresh_token,
                rex.data.expires_in,
                rex.data.user_id,
                expire_time,
                rex.data.access_token,
                partnerID,
                partnerKey,
                redirect_url,
                shop_id)
            )
        
        
        credenciais = List({ marketplace : "shopee"}); 

        //getAccountUser(req,res);

        res.redirect(`https://localhost:3000/main/start`)
    });    
}


exports.getAccountUser = (req, res) => {

    console.log('getAccountUser shopee')    
    let url = "";

    var options = {
        headers : {
            'Content-Type' : 'application/json'            
        }
    };

    axios.get(url,options)
    .then((rex)=>
    {                             
        AccountUserRepository.adicionar(
            new UserAccount(rex.data.id,rex.data.nickname,rex.data.first_name,rex.data.last_name)
        )
    
    });   
    
}

function getItem(req){
    console.log(`getItem shopee ${req.query.item}`)     
    
    let path = '/api/v2/product/get_item_base_info'

    var timestamp = Timestamp();  
        
    var signature = createSignatureWithToken(path,timestamp);
  
    let param = `&item_id_list=${req.query.item}`;
    let url = host+path
    +"?partner_id="+partnerID
    +"&timestamp="+timestamp
    +"&sign="+signature
    +"&shop_id="+credenciais.shop_id
    +"&access_token="+credenciais.access_token
    + param;

    return url;
}


//https://localhost:3000/autenticacao/shopee/obter-preco-venda?item=1788829
exports.getPrecoVenda = (req, res) => {
    console.log(`getPrecoVenda ${req.query.item}`)     
    let item = getItem(req);
    axios.get(item).then((response) => {         
        res.json({"" : response.data.response.item_list});                       
    });
}

//https://localhost:3000/autenticacao/shopee/obter-item?item=1788829
exports.getItem = (req, res) => {
    console.log(`getItem shopee ${req.query.item}`)     

    let aux = getItem(req);
    axios.get(aux).then((response) => {         
        res.json({"" : response.data});                       
    });
}


function createSignature(path,timestamp){     
    //partner_id, api path, timestamp
    var baseString = partnerID + path + timestamp
    return crypto.createHmac('sha256',partnerKey).update(baseString).digest('hex');   
}

function createSignatureWithToken(path,timestamp){  
    //partner_id, api path, timestamp, access_token, shop_id  
    var baseString = partnerID + path + timestamp + credenciais.access_token + credenciais.shop_id 
    console.log(`createSignatureWithToken ${baseString}`)
    return crypto.createHmac('sha256',partnerKey).update(baseString).digest('hex');   
}


  



