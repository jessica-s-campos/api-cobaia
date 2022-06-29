
var {Model} = require("../models/Credenciais");

    /*
    model = new Credencial({
        marketplace : marketplace,      
        refresh_token: refresh_token,
        expire_in: expire_in,
        user_id: user_id,
        expire_time: expire_time,
        access_token: access_token,
        app_id: app_id,
        app_key: app_key,
        redirect_url : redirect_url,
        shop_id : shop_id
    });
    */

    module.exports = class CredencialRepository{
        constructor(){
           
        }
    
        adicionar(){
            Model.save((err, model) => {
                if (err) 
                    return console.error(err);
                
                console.log(`Credencial salva"`);
            })
        }
    
        excluir(query){
            Model.deleteOne(query,(err, data) => {
                if (err) return console.error(err);
                
                console.log(`Credencial deletada."`);
            });
        }
    
        listBy(query){
            let dados = new Promise((resolve, reject)=>{
                Model.find(query, function (err, data) {
                    if (err) return console.error(err);   
                             
                    resolve(data);    
                });
            }).then((data)=>{        
                return data;
            })         
            return dados; 
        }
    
        listAll(){
            Model.find({}, function (err, data) {
                if (err) return console.error(err);
                
                console.log(data);
            });
        }
    }