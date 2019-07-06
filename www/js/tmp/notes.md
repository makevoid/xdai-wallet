### notes

basic cordova deviceready event, possibly useful for nfc

```js
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

app.initialize()
```js
