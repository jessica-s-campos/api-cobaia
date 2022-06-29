'use strict'

const { Client } = require('pg');

let client = {};
console.log(process.env.ENVIRONMENT)
if(process.env.ENVIRONMENT == 'PROD'){
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }    
  });
}
else{

  /*client = new Client({
    connectionString: 'postgres://oucuvnnunbvbdc:385cfc76f88905d392b9f2edd6e585c1902a3b2db0c2f144c1c05d73b20ee205@ec2-18-235-109-97.compute-1.amazonaws.com:5432/d4b3ge7go35ckt',
    ssl: {
      rejectUnauthorized: false
    }    
  });*/
  
  client = new Client({
    user: process.env.PGUSER,
    host: 'localhost',
    database: 'elias-site',
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
}

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  },  
}