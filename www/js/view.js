Actions = {}
Actions.send = ({ address, amount }) => {
  console.log("SEND", { address, amount })
  const to = address
  const value = amount
  const txID = window.app.keychain.send({ to, value })
  console.log("TX ID:", txID)
}

class View {
  constructor() {
    this.receiveInputElemSel  = ".receive-screen .receive-address-input > input"
    this.balanceElemSel  = ".balances > .balance > .bal"
    this.sendButtonSel   = ".send-form .send-button"
    this.sendAddressElemSel = ".send-form .recipient-address"
    this.sendAmountElemSel  = ".send-form .send-amount"
    this.listenToAppEvents()
    this.bindButtons()
  }

  get receiveInputElem() {
    return doc.querySelector(this.receiveInputElemSel)
  }

  get balanceElem() {
    return doc.querySelector(this.balanceElemSel)
  }

  get sendButton() {
    return doc.querySelector(this.sendButtonSel)
  }

  get sendAddressElem() {
    return doc.querySelector(this.sendAddressElemSel)
  }

  get sendAmountElem() {
    return doc.querySelector(this.sendAmountElemSel)
  }

  bindButtons() {
    console.log("BIND")
    this.sendButton.addEventListener("click", this.triggerSend.bind(this))
  }

  triggerSend() {
    const address = this.sendAddressElem.value
    const amount  = this.sendAmountElem.value
    Actions.send({ address, amount })
  }

  listenToAppEvents() {
    const eventsSelector = "html > body > div.events" // (hidden, empty div)
    const eventsElem = doc.querySelector(eventsSelector)
    eventsElem.addEventListener('info', this.updateAddress.bind(this))
    eventsElem.addEventListener('balance', this.updateBalance.bind(this))
  }

  updateAddress(evt) {
    const { address } = evt.detail
    this.receiveInputElem.value = address
  }

  updateBalance(evt) {
    const { balanceUsd } = evt.detail
    const balanceUsdRound = Math.round( balanceUsd * 100000 ) / 100000
    this.balanceElem.innerHTML = balanceUsdRound
  }
}
