
var {Model} = require("../models/UserAccount");
/**
 * 
 *  model = new UserAccount({
        id : pId,
        nickname : pNickName,
        first_name : pFirstName,
        last_name : pLastName  
    });
 */

module.exports = class AccountUserRepository{
    constructor(){       
    }

    adicionar(){
        Model.save((err) => {
            if (err) 
                return console.error(err);
            
            console.log(`Conta de Usuario salva"`);
        })
    }

    excluir(query){
        Model.deleteOne(query,(err, data) => {
            if (err) return console.error(err);
            
            console.log(`Conta de Usuario deletada"`);
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

