'use strict'
//
// class NullKeychain {}
//
// class App {
//
//   constructor() {
//     this.wallet = new NullKeychain()
//   }
//
//   initKeychain() {
//     console.log("init keychain")
//     const wallet = new Keychain({ store: localStorage })
//     this.wallet = wallet
//     wallet.info()
//
//     ;(async () => {
//     console.log("netinfo")
//     await wallet.netInfo()
//     // console.log("sendTXSelf")
//     // await wallet.sendTXSelf()
//     // console.log("netInfo")
//     // await wallet.netInfo()
//     })()
//   }
//
//   get address() {
//     return this.keychain.address
//   }
//
//   genNewAddress() {
//     return this.keychain.getNewAddress()
//   }
//
// }
//
// const app = new App()
//
// console.log("address:", app.address)
// app.initKeychain()
