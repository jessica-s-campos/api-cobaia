'use strict'

var https = require('https')

exports.get = (req, res, next) => {
    var taxas = {};

    res.header("Access-Control-Allow-Origin", "*");	
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    https.get("https://www.mercadolivre.com.br/landing/costos-venta-producto/api/categories_price/"+req.query.id+"/MLB/"+req.query.categoria, 
    (ret) => {
        let data = '';

        ret.on('data', (chunk) => {
            data += chunk;                       
        });

        ret.on('end', () => {     
            var json = JSON.parse(data);

            taxas.id = req.query.id;                 
            taxas.categoria = req.query.categoria;                              
        
            json.map(o => {

                if(o.listing_type_name == "Clássico" && o.sale_fee_amount > 1)
                {
                    taxas.classico=o.sale_fee_amount;                                              
                }
                else if(o.listing_type_name == "Premium" && o.sale_fee_amount > 1)     {
                    taxas.premium=o.sale_fee_amount;                        
                }
                    
            })
            
            res.json(JSON.parse(JSON.stringify(taxas)));            
        });

            
        }).on("error", (error) => {
        console.log(error);
    });
     
}



