const mongoose = require("mongoose");
    module.exports = class GenericRepository{
        constructor(){
           
        }
    
        adicionar(model){
            model.save((err) => {
                if (err) 
                    return console.error(err);
            })
        }
    
        excluir(query,collectionName){
            mongoose.model(collectionName).deleteOne(query,(err, data) => {
                if (err) return console.error(err);
            });
        }
    
        listBy(query,collectionName){
            let dados = new Promise((resolve, reject)=>{
                mongoose.model(collectionName).find(query, function (err, data) {
                    if (err) return console.error(err);   
                             
                    resolve(data);    
                });
            }).then((data)=>{        
                return data;
            })         
            return dados; 
        }
    
        listAll(collectionName){
            mongoose.model(collectionName).find({}, function (err, data) {
                if (err) return console.error(err);
                
                console.log(data);
            });
        }
    }