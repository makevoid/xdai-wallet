class App {

  constructor() {
    this.keychain   = new NullKeychain()
    this.balance    = new NullBalance()
    this.balanceUsd = new NullBalance()
    this.rate       = new NullRate()
    this.events     = new NullEventEmitter()
    this.addEventsEmitter()
    this.initView()
    this.initKeychain()
  }

  initView() {
    new View()
    console.log("View initialized")
  }

  addEventsEmitter() {
    const bodyElem  = doc.querySelector("html > body")
    const domNode   = doc.createElement("div")
    domNode.classList = ["events"]
    bodyElem.appendChild(domNode) // div.events.hidden (empty div)
    const eventsElem    = doc.querySelector("html > body > div.events") // div.events.hidden (empty div)
    const eventEmitter  =  eventsElem
    this.events = eventEmitter
  }

  initKeychain() {
    console.log("init keychain")
    const keychain = new Keychain({ store: localStorage })
    this.keychain = keychain
    // keychain.info()
    const data = {
      address: keychain.address
    }
    console.log("EMIT INFO", this.events, data)
    const tabChangeEvt = () => {
      console.log("TAB CHANGE")
    }
    document.querySelector('#main-tabbar').addEventListener('prechange', tabChangeEvt)
    console.log("x", document.querySelector(".receive-screen .receive-address-input > input").value)
    this.emit({ event: "info", data: data })

    ;(async () => {
      // TODO: port back to keychain
      const { balanceEth } = await keychain.netInfo()
      // TODO: include rate into keychain
      this.balance = balanceEth
      this.updateBalanceUsd()

      // events
      //
      // require('EventEmitter')
      // we take the eventEmitter functionality from an isolated dom node


      // TODO: load cached value, load FX value from network later (10 seconds, or if everything else is loaded)
      await this.loadFX()

      // console.log("sendTXSelf")
      // await keychain.sendTXSelf()

      // console.log("netInfo")
      // await keychain.netInfo()
    })()
  }

  emit({ event, data }) {
    // console.log("emit", event)
    // const events = this.events
    const events = doc.querySelector("html > body > div.events")
    const customEvent = new CustomEvent(event, { detail: data })
    events.dispatchEvent(customEvent)
  }

  async loadFX() {
    const price = await this.getDaiPrice()
    this.rate = price
    this.updateBalanceUsd()
    console.log("Balance USD:", this.balanceUsd)
    const data = { balanceUsd: this.balanceUsd }
    this.emit({ event: "balance", data: data })
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
