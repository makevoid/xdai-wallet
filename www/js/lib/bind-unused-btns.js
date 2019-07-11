const showTODONotification = () => {
  // @makevoid needs more time to finish this :D
  const message = "This feature is not yet implemented, sorry - tweet to @makevoid that you really want this feature and I'll do it :)"
  const opts = { timeout: 1000, animation: 'default' }

  ons.notification.toast(message, opts)
}

const bindSettingsBtn = () => {
  const settingsSel   = ".icon-main-right.icon-settings"
  const settingsElem  = document.querySelector(settingsSel)
  settingsElem.addEventListener('click', showTODONotification)
}

const bindNotEnabledButtons = () => {
  const qrScanSel     = ".btn-scan.button-scan"
  const pasteSel      = ".btn-paste.button-paste"
  const qrScanElem    = document.querySelector(qrScanSel)
  const pasteElem     = document.querySelector(pasteSel)
  qrScanElem.addEventListener('click', showTODONotification)
  pasteElem.addEventListener('click',  showTODONotification)
}
