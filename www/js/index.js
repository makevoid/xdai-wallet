
var app = {
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
        var parentElement = document.getElementById(id)
        // var listeningElement = parentElement.querySelector('.listening')
        // var receivedElement = parentElement.querySelector('.received')

        // listeningElement.setAttribute('style', 'display:none')
        // receivedElement.setAttribute('style', 'display:block')
        //
        // console.log('Received Event: ' + id)
    }
}

app.initialize()

console.log("test")

//  --------

window.fn = {}

window.fn.toggleMenu = () => {
  document.getElementById('appSplitter').right.toggle()
}

window.fn.loadView = (index) => {
  document.getElementById('appTabbar').setActiveTab(index)
  document.getElementById('sidemenu').close()
}

window.fn.loadLink = (url) => {
  window.open(url, '_blank')
}

window.fn.pushPage = (page, anim) => {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim })
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } })
  }
}
