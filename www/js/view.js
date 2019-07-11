// animation-options: { duration: 0.2, delay: 1, timing: 'ease-in' }

const isEthAddress = (address) => (
  window.web3utils.isAddress(address)
)

const msgToast = (message) => {
  ons.notification.toast(message, { timeout: 1000, animation: 'default' })
}

const msgToastQuick = (message) => {
  ons.notification.toast(message, { timeout: 200, animation: 'default' })
}

const errToast = (message) => {
  ons.notification.toast(message, { timeout: 1000, animation: 'fall' })
}

Actions = {}

Actions.displaySendAddressMissingError = () => {
  errToast("Please specify the recipient address")
}

Actions.displaySendAmountMissingError = () => {
  errToast("Please specify the amount of the transaction")
}

Actions.updateBalance = async () => {
  await window.app.updateBalance()
  msgToastQuick("Balance refreshed!")
}

// TODO:
Actions.send = async ({ address, amount }) => {
  console.log("SEND", { address, amount })
  const to = address
  const value = amount
  if (!address) return Actions.displaySendAddressMissingError()
  if (!amount)  return Actions.displaySendAmountMissingError()
  if (!isEthAddress(address)) return Actions.displaySendError()
  msgToast("sending transaction...")
  const txID = await window.app.keychain.send({ to, value })
  console.log("TX ID:", txID)
  msgToast(`transaction sent! 0x${txID.slice(0, 6)}...`)
}

class View {
  constructor() {
    this.receiveInputElemSel  = ".receive-screen .receive-address-input > input"
    this.balanceElemSel  = ".balances > .balance > .bal"
    this.sendButtonSel   = ".send-form .send-button"
    this.sendAddressElemSel = ".send-form .recipient-address"
    this.sendAmountElemSel  = ".send-form .send-amount"
    this.refreshBalanceBtnSel  = ".balances.list .refresh-balance-btn"

    this.listenToAppEvents()
    this.bindButtons()
  }


  bindButtons() {
    this.sendButton.addEventListener("click", this.triggerSend.bind(this))
    this.refreshBalanceBtn.addEventListener("click", this.refreshBalance.bind(this))
  }

  triggerSend() {
    const address = this.sendAddressElem.value
    const amount  = this.sendAmountElem.value
    ;(async () => {
      await Actions.send({ address, amount })
    })().catch((err) => {
      console.error(err)
    })
  }

  refreshBalance() {
    ;(async () => {
      await Actions.updateBalance()
    })().catch((err) => {
      console.error(err)
    })
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

  // element getters (helpers)

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

  get refreshBalanceBtn() {
    return doc.querySelector(this.refreshBalanceBtnSel)
  }
}
