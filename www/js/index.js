const doc = document

const bindButtons = () => {
  // doc.querySelector(".refresh-btn").addEventListener("click", refreshPage)
}

//  --------

const contentLoadFailed = (err) => {
  console.error("Content load failed")
  console.log("Original error:")
  console.log(err)
}

const main = {}

window.fn = main

main.defaultPage = "receive.html"
main.currentPage = main.defaultPage

main.open = () => {
  const splitter = doc.querySelector('#splitter')
  splitter.open()
}

main.setCurrentPage = (page) => (
  () => {
    main.currentPage = page
  }
)

main.load = (page) => {
  const content  = doc.querySelector('#content')
  const splitter = doc.querySelector('#splitter')
  content.load(page)
    .then(splitter.close.bind(splitter))
    .then(bindButtons)
    .then(main.setCurrentPage(page))
    .catch(contentLoadFailed)

  // refactored:
  //
  // return (async () => {
  //   const content  = doc.querySelector('#content')
  //   const splitter = doc.querySelector('#splitter')
  //   const contentIsLoaded = await content.load(page)
  //   splitter.close.bind(splitter)
  //   bindButtons()
  //   main.setCurrentPage(page)
  //   console.log("contentIsLoaded:", contentIsLoaded)
  //   return contentIsLoaded
  // })()
}

main.refreshPage = () => {
  console.log(`refreshing ${main.currentPage}`)
  main.load(main.currentPage)
}


// TODO: merge


class NullKeychain {}
class NullBalance {}
class NullRate {}

class App {

  constructor() {
    this.keychain   = new NullKeychain()
    this.balance    = new NullBalance()
    this.balanceUsd = new NullBalance()
    this.rate       = new NullRate()
  }

  initKeychain() {
    console.log("init keychain")
    const keychain = new Keychain({ store: localStorage })
    this.keychain = keychain
    // keychain.info()

    ;(async () => {
      // TODO: port back to keychain
      const { balanceEth } = await keychain.netInfo()
      // TODO: include rate into keychain
      this.balance = balanceEth
      this.updateBalanceUsd()


      // require('EventEmitter')
      // we take the eventEmitter functionality from an isolated dom node
      const doc = document
      const bodyElem  = doc.querySelector("html > body")
      const domNode   = doc.createElement("div")
      domNode.classList = ["events"]
      bodyElem.appendChild(domNode) // div.events.hidden (empty div)
      const eventsElem = doc.querySelector("html > body > div.events") // div.events.hidden (empty div)
      const eventEmitter =  eventsElem
      eventEmitter.on('balance', () => {
        console.log('an evenbalance occurred!')
      })
      eventEmitter.emit('balance')
      console.log(eventEmitter, eventsElem)

      this.events = eventEmitter
      this.events.updateBalances

      // TODO: load cached value, load FX value from network later (10 seconds, or if everything else is loaded)
      await app.loadFX()

      // console.log("sendTXSelf")
      // await keychain.sendTXSelf()

      // console.log("netInfo")
      // await keychain.netInfo()
    })()
  }

  async loadFX() {
    const price = await this.getDaiPrice()
    this.rate = price
    this.updateBalanceUsd()
    console.log("Balance USD:", this.balanceUsd)
  }

  updateBalanceUsd() {
    if (this.rate instanceof NullRate) return
    this.balanceUsd = this.rate * this.balance
  }

  async getDaiPrice() {
    let resp = await fetch("https://min-api.cryptocompare.com/data/price?fsym=DAI&tsyms=USD")
    resp = await resp.json()
    resp = resp.USD
    console.log("DAIUSD rate fetched:", resp)
    return resp
  }

  get address() {
    return this.keychain.address
  }

  genNewAddress() {
    return this.keychain.getNewAddress()
  }

  // get balance() {
  //   return this.keychain.balance
  // }

}

const app = new App()

app.initKeychain()
