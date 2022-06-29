'use strict'

var https = require('https')

exports.get = (req, res, next) => {
    var taxas = {};

    var meli_cfg_app_id = 1354321273735197
    var meli_cfg_client_secret = "FOrwRrj4IykRlcbuJOmyHe19zCf9Qt5s"

    res.header("Authorization", "Bearer " + token);	
    res.header("Access-Control-Allow-Origin", "*");	
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    https.get("https://api.mercadolibre.com/items?ids="+req.query.ids+"&attributes=id,price,category_id,title,sku", 
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



