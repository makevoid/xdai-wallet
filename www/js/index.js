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
    receivedEvent: function(id) {
        const parentElement = document.getElementById(id)
        // const listeningElement = parentElement.querySelector('.listening')
        // const receivedElement = parentElement.querySelector('.received')

        // listeningElement.setAttribute('style', 'display:none')
        // receivedElement.setAttribute('style', 'display:block')
        //
        // console.log('Received Event: ' + id)

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
}

main.refreshPage = () => {
  console.log(`refreshing ${main.currentPage}`)
  main.load(main.currentPage)
}

// TODO: move to unobtrusive binding
// page.querySelector('[component="button/save-task"]').onclick = function() {


//
// window.fn = {}
//
// window.fn.toggleMenu = () => {
//   document.getElementById('appSplitter').right.toggle()
// }
//
// window.fn.loadView = (index) => {
//   document.getElementById('appTabbar').setActiveTab(index)
//   document.getElementById('sidemenu').close()
// }
//
// window.fn.loadLink = (url) => {
//   window.open(url, '_blank')
// }
//
// window.fn.pushPage = (page, anim) => {
//   if (anim) {
//     document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim })
//   } else {
//     document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } })
//   }
// }
