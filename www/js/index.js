const d = document

const app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready')
    },

    // Update DOM on a Received Event
    receivedEvent: function(evtId) {
        console.log('Received Event: ' + evtId)

        console.log("ready")
        bindButtons()
    }
}

const bindButtons = () => {
  // d.querySelector(".refresh-btn").addEventListener("click", refreshPage)
}

app.initialize()

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
  const splitter = d.querySelector('#splitter')
  splitter.open()
}

main.setCurrentPage = (page) => (
  () => {
    main.currentPage = page
  }
)

main.load = (page) => {
  const content  = d.querySelector('#content')
  const splitter = d.querySelector('#splitter')
  content.load(page)
    .then(splitter.close.bind(splitter))
    .then(bindButtons)
    .then(main.setCurrentPage(page))
    .catch(contentLoadFailed)

  // refactored:
  //
  // return (async () => {
  //   const content  = d.querySelector('#content')
  //   const splitter = d.querySelector('#splitter')
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
