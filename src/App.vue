<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <h2>loss prevention</h2>
      <v-spacer></v-spacer>
      <v-btn
      small
      color="green"
      @click="showPip = !showPip"
      v-if="!showPip">
        Ale
      </v-btn>
      <v-btn
          small
          color="red"
          @click="showPip = !showPip"
          v-if="showPip">
        Pip
      </v-btn>
    </v-app-bar>
    <v-main>
      <br>
      <Map v-if="!showPip" :location="this.locationAlejandro" :time="timeAlejandro" name="Alejandro" :movement="movementStateAlejandro" :notifications="notificationsAlejandro"/>
      <Map v-if="showPip" :location="this.locationPip" :time="timePip" name="Pip" :movement="movementStatePip" :notifications="notificationsPip"/>
    </v-main>
  </v-app>
</template>

<script>
import Map from './components/Map';

export default {
  name: 'App',

  components: {
    Map,
  },

  data: () => ({
    movementStatePip: false,
    movementStateAlejandro: false,
    notificationsPip: false,
    notificationsAlejandro: false,
    client: null,
    locationPip: {
      "lat": 0,
      "lng": 0
    },
    locationAlejandro: {
      "lat": 0,
      "lng": 0
    },
    timePip: null,
    timeAlejandro: null,
    showPip: false
  }),

  created() {

    this.client = new Paho.MQTT.Client('test.mosquitto.org', Number(8081), 'webclient' + parseInt(Math.random() * 100, 10))
    // connect the client
    this.client.connect({onSuccess: this.onConnect, useSSL:true})
    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost
    this.client.onMessageArrived = this.onMessageArrived
  },
  methods: {
    onMessageArrived(message) {

      // Message from Alejandro
      if (message.destinationName === 'fhnw-iot-gpstracker/devices/fhnw-iot-gpstracker-alejandro/up') {
        let msgAle = JSON.parse(message.payloadString)
        this.locationAlejandro = msgAle.payload_fields.location
        this.movementStateAlejandro = true
        console.log(msgAle)
        console.log('New data from Alejandro arrived: ')
        console.log(this.locationAlejandro)
        this.timeAlejandro = this.getTime()

        setTimeout(() => {
          this.movementStateAlejandro = false
        }, 40000);
      }
      if (message.destinationName === 'fhnw-iot-lossprevention/alejandro/notifications') {
        let notification = JSON.parse(message.payloadString)
        this.notificationsAlejandro = notification;
        console.log('Alejandro Notifications: ' + notification)
      }


      // Message from Pip
      if (message.destinationName === 'fhnw-iot-lossprevention/devices/fhnw-iot-lossprevention-device0/up') {
        let msgPip = JSON.parse(message.payloadString)
        this.locationPip = msgPip.payload_fields.location
        this.movementStatePip = true
        console.log('New data from Pip arrived: ')
        console.log(this.locationPip)
        this.timePip = this.getTime()

        setTimeout(() => {
          this.movementStatePip = false
        }, 40000);
      }
      if (message.destinationName === 'fhnw-iot-lossprevention/pip/notifications') {
        let notification = JSON.parse(message.payloadString)
        this.notificationsPip = notification;
        console.log('Pip Notifications: ' + notification)
      }


    },
    onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
      }
    },
    onConnect() {
      console.log('connected to MQTT Broker')
      //subscribe to topic
      this.client.subscribe('fhnw-iot-lossprevention/devices/fhnw-iot-lossprevention-device0/up')
      this.client.subscribe('fhnw-iot-gpstracker/devices/fhnw-iot-gpstracker-alejandro/up')
      this.client.subscribe('fhnw-iot-lossprevention/alejandro/notifications')
      this.client.subscribe('fhnw-iot-lossprevention/pip/notifications')
    },
    getTime() {
      let time = new Date()
      time.setHours( time.getHours() + 1 );
      time = time.toJSON().substring(10, 19).replace('T', ' ');
      return time
    }
  }

};
</script>
