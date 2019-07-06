'use strict'

const bip39 = require("bip39")
const hdkey = require('ethereumjs-wallet/hdkey')
const web3 = require("web3")
// const Mnemonic = require('bitcore-mnemonic')
// const EthereumBIP44 = require('ethereum-bip44')
// const EthereumBIP44 = require('ethereum-bip44/dist/es5')

class PrivateKeyNotLoadedError extends Error {
  constructor() { super("Private Key Not Loaded") }
}

class NullAddress { }

class Keychain { // Wallet
  constructor() {
    this.addr = new NullAddress
  }

  get address() {
    if (!this.addr || this.addr instanceof NullAddress) throw new PrivateKeyNotLoadedError()
    return this.addr
  }

  set address(addr) {
    this.addr = addr
  }

  initWallet() {
  
  }

}

class App {

  constructor() {
    this.ethRpcHost = "63.35.248.254"

    this.keychain = this.initKeychain()
  }

  initKeychain() {
    const keychain = new Keychain()
    keychain.initWallet()
    return keychain
  }

  get address() {
    return this.keychain.address
  }

  genNewAddress() {
    return this.keychain.getNewAddress()
  }

}

const app = new App()

console.log("address:", app.address)
