const showTODONotification = () => {
  // @makevoid needs more time to finish this :D
  const message = "This feature is not yet implemented, sorry - tweet to @makevoid that you really want this feature and I'll do it :)"
  const opts = { timeout: 1000, animation: 'default' }

  ons.notification.toast(message, opts)
}

const bindNotEnabledButtons = () => {
  const settingsSel   = ".icon-main-right.icon-settings"
  const qrScanSel     = ".btn-scan.button-scan"
  const pasteSel      = ".btn-paste.button-paste"
  const settingsElem  = document.querySelector(settingsSel)
  const qrScanElem    = document.querySelector(qrScanSel)
  const pasteElem     = document.querySelector(pasteSel)
  settingsElem.addEventListener('click', showTODONotification)
  qrScanElem.addEventListener('click', showTODONotification)
  pasteElem.addEventListener('click', showTODONotification)

  return {
    settingsElem,
    qrScanElem,
    pasteElem,
  }
}
