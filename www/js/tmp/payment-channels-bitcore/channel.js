const bitcoreChannel = require('bitcore-channel')
const bitcore = require('bitcore-channel/node_modules/bitcore-lib') // require('bitcore-lib')
const fs = require('fs')
const PrivateKey    = bitcore.PrivateKey
const UnspentOutput = bitcore.Transaction.UnspentOutput

// APIs - DSLs
// const Consumer = require('../vendor/lib/Consumer')
// const Consumer = require('bitcore-channel').Consumer
const Consumer  = bitcoreChannel.Consumer
const Refund    = bitcoreChannel.Refund
const Payment   = bitcoreChannel.Payment

// const Keychain = require('bitcoinjs-keychain')

const bcApi   = require('blockchain-api-basic')

class Keychain  {

  constructor(store) {
    this._store = store
  }

  get store() {
    return this.store
  }

  set store(store) {
    this._store = store
  }

  async getUTXOs(address) {
    return bcApi.utxos(address)
  }

}

const store = {}
const keychain = new Keychain(store)

const fundingKey = new PrivateKey('1e5205ffd43cde8c28d6fd3550ae6d693d2dfb3590309ac72e61bcb12808cad9') // 1GTVbuefdhBw5AJYvEzgSZiswCeehTMSYE
const refundKey = new PrivateKey('09baf5135e31810fa0309f90bddc5a7793266e692fef75607661cb89c8cc693d') // 17CyorvFYRiiWX4JHJVXYtjPnbb19irAAz
const commitmentKey = new PrivateKey('3e65c6898c80f6a77a3f7ced4a8fa8fc4df081b5e6e22c0df7075b040538344e') // 1AxQNodqn5mtjpxixuUGudkdxwms9jpUjh

const providerKey = new PrivateKey('8d2f49aaeb983e51dbd14843fccfe4713f3cbc87ccd16dd2c0bccaac22de052f') // 1AiVhq8pYuBmCUQCHAk4WCeApYKgCHuATp

const consumer = new Consumer({
  fundingKey:         fundingKey,
  refundKey:          refundKey,
  refundAddress:      refundKey.toAddress(),
  commitmentKey:      commitmentKey,
  providerPublicKey:  providerKey.publicKey,
  providerAddress:    providerKey.toAddress()
})

let utxos = []
console.log("\n\nFIXME!\n\n")

const fundingAddress = consumer.fundingAddress

const transformUTXOs = (utxos, address) => {
  return utxos.map((utxo) => {
    return transformUTXO(utxo, address)
  })
}

const transformUTXO = (utxo, address) => {
  return new UnspentOutput({
    txid: utxo.tx_hash,
    // txid: utxo.tx_hash_big_endian,
    address:      address,
    satoshis:     utxo.value,
    outputIndex:  utxo.tx_output_n,
    scriptPubKey: utxo.script,
  })
}

const main = async () => {

  try {
    console.log(`getting UTXOs from address: ${fundingAddress}`)
    utxos = await keychain.getUTXOs(fundingAddress)
    console.log("utxos:", utxos)
    utxos = transformUTXOs(utxos, fundingAddress)
    console.log("utxos:", utxos)
  } catch (e) {
    console.log("caught error:")
    console.error(e)
    console.log("\n\n")
  }

  if (Array.isArray(utxos) && utxos.length == 0) {
    console.error("ERROR: NO UTXOS - can't open the channel")
  } else {
    // insight.getUnspentUtxos(consumer.fundingAddress, function(err, utxos) {
      consumer.processFunding(utxos)
      consumer.commitmentTx._updateChangeOutput()
      fs.writeFileSync('tmp/unsigned.refund.log', consumer.setupRefund().toString())
      console.log("-------")
      console.log("unsigned refund:")
      console.log(consumer.setupRefund().toJSON())
      console.log("-------")
      console.log("commitment Tx:")
      console.log(consumer.commitmentTx.toJSON())
      console.log("-------")
      fs.writeFileSync('tmp/commitment.log', consumer.commitmentTx.toString())
    // })
  }

}

; // :)
(async () => {

  await main()

  // TODO: ok you have a channel opened now

  // - TODO: pay

  // - TODO: close the channel

})()
