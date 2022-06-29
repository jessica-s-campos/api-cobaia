'use strict'


let fs = require('fs');
const request = require('request');
const childProcess = require('child_process');
var progress = require('request-progress');

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {    
    /*progress(request(url))
    .on('progress', (state)=>console.log('progress:',state))
    .on('response', (response) => console.log("status code:", response.statusCode))
    .on('error', (err) => console.log('err:',err))
    .on('end', (end)=>console.log('end:',end))
    .pipe(fs.createWriteStream(path))*/

    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}


/*
1º - Baixar os destaques para alguma pasta
2º - Ordenar e renomear os arquivos
3º - Converter imagens em grayscale
4º - ler textos e gerar txts
5º - Juntar os txts em um único com detalhes do storie onde ele está
*/

exports.get = (req, res, next) => {
  var local = "C:\\Users\\jessi\\Downloads\\Lara\\";
  var imagens_str = "";
  var imagens_urls = [];

  //Arquivo HAR baixado sendo tratado
  const HARFile = fs.readFileSync(`${local}www.instagram.com-3.har`)
  const HARJson = JSON.parse(HARFile);
  //console.log(HARJson)
  let pedaco ;  

  //fs.writeFileSync(local+"har.json",JSON.stringify(HARJson,undefined,2));

  HARJson.log.entries.some(o => {    
    var regex = new RegExp('highlight:[0-9]*')
    if(o.response.content.text && o.response.content.text.match(regex)){

      var destaqueID = regex.exec(o.response.content.text.substring(0,80)).toString().split(":")[1];
      pedaco = JSON.parse(o.response.content.text);
      //fs.writeFileSync(local+"pedaco.json",JSON.stringify(pedaco,undefined,2));
                  
      //Lendo o JSON e obtendo a url de cada imagem a ser trabalhada    
      pedaco.reels[`highlight:${destaqueID}`].items.map(o=>{
        //console.log(o.pk);
        
        //se tiver o.video_versions é um vídeo
        o.image_versions2.candidates.map(b=> {
          if(b.width == o.original_width && b.height == o.original_height){
            imagens_urls.push(b.url);            
          }
        })    
      })
        
      //console.log(local+destaqueID)
      //Cria a pasta do destaque se ela não existe
      if (!fs.existsSync(local+destaqueID)){
        fs.mkdirSync(local+destaqueID);
      }

      var contador = 1;
      console.log(`Realizando o download dos stories do destaque ${destaqueID}`) 
      //Realizando o Download das imagens (stories)
      new Promise((resolve, reject)=>{        
        for (let index = 0; index < imagens_urls.length; index++) {         
          download(imagens_urls[index], `${local}${destaqueID}\\${index}.jpg`, function (state) {
              
            //Executando o comando para transformar em preto e branco
            childProcess.execSync(`c: && cd ${local}${destaqueID} &&  magick ${index}.jpg -type grayscale ${index}.jpg `).toString();        
            
            if(contador==imagens_urls.length){
              console.log(`✅ Download OK! ${imagens_urls.length} stories baixados`)     
              resolve()
            }              
            contador++;
          });
         
        }

        
      }).then(()=>{
        console.log(`Lendo os textos dos stories e criando os txts individuais`) 

        //Executando os comandos o OCR e ler o texto e colocar em um txt
        const cmd1 = childProcess.execSync(`c: && cd ${local}${destaqueID} && forfiles /c "cmd /c tesseract @file @fname"`).toString();      

        //Criando 1 txt único.  
        fs.readdir(`${local}${destaqueID}`, function (err, files) {    
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          }    
          files.forEach(function (file) {
            new Promise((resolve, reject)=>{
              if(file.includes('.txt'))  
              {      
                console.log(`Lendo o arquivo ${local}${destaqueID}\\`+file)
                fs.readFile(`${local}${destaqueID}\\`+file, 'utf8', function(err, data) {
                  if (err) throw err;         
                  
                  fs.appendFile(`${local}${destaqueID}\\`+"conteudo.txt", "\r\n -------------------------------- \r\n Stories nº" + file.split(".")[0] + "\r\n" + data, function (err) {
                    if (err) throw err;                  
                  })
    
                  resolve()
                });
              }
              
            })
          });
        });

        
      })

      
      

    }
    return o.response.content.text && o.response.content.text.includes(`highlight:${destaqueID}`)
  })

 

 
}



