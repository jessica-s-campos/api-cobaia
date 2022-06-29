'use strict'

var https = require('https')

exports.get = (req, res, next) => {
   res.redirect(`https://localhost:3000/autenticacao/shopee/`)  
}

exports.getStart = (req, res, next) => {
   console.log(`Autenticadah :)`)
}



