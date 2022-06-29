'use strict'


let fs = require('fs');
const request = require('request');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();


/*
1º - Converter imagens em grayscale
2º - ler textos e gerar txts
3º - Juntar os txts em um único com detalhes do storie onde ele está
*/

async function quickstart(fileName) {
 
  const [result] = await client.documentTextDetection(fileName);
const fullTextAnnotation = result.fullTextAnnotation;
console.log(`Full text: ${fullTextAnnotation.text}`);
}

exports.get = (req, res, next) => {
    var local = "C:\\Users\\jessi\\Downloads\\Notinhas\\";


    if (!fs.existsSync(local)){
      fs.mkdirSync(local);
    }

    console.log(`Lendo os textos das imagens e criando os txts individuais`) 

    
    fs.readdir(`${local}`, function (err, files) {    
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }    
      files.forEach(function (file) {
        if(file.includes('.jpg'))  {
          console.log(`${local}${file}`)
          var filename = `${local}${file}`;
          quickstart(filename);
        }
        
      });
    });

   
}



