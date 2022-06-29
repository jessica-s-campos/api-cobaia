'use strict'
const { redirect } = require('express/lib/response')
const crypto = require('crypto')

const _key = crypto.randomBytes(32);
const _iv = crypto.randomBytes(16);

function decrypt(text) {   
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(_key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

exports.DecodeValue = (_value) => {           
    return decrypt(_value);  
}

exports.EncodeValue = (_value) => {  
    
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(_key), _iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        
        return { iv: _iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }        

    return encrypt(_value);        
}
