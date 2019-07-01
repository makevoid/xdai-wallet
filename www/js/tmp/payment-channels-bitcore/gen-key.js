const bitcore = require('bitcore-channel/node_modules/bitcore-lib')
const PrivateKey = bitcore.PrivateKey

const privateKey = new PrivateKey()

console.log("Private key:", privateKey.toString())
console.log("Address:", privateKey.toAddress().toString())
