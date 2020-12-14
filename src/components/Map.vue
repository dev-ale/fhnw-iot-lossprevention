<template>
  <div>
      <v-row>
        <v-col align="center">
          <v-card width="90%" max-width="500" class="card-outter">
            <v-card-title class="justify-center">{{ name }}'s Fahrrad</v-card-title>
            <v-card-text v-if="!location.lat && !location.lng">
              <p>loading</p>
              <v-progress-linear indeterminate color="blue lighten-4"></v-progress-linear>

            </v-card-text>
            <v-card-text v-if="location.lat && location.lng">
              <p>Lattitude: {{ location.lat }}</p>
              <p>Longitude: {{ location.lng }}</p>
            </v-card-text>
            <v-card-actions v-if="location.lat && location.lng">
              <v-btn
                  v-if="timeStamp"
                  elevation="2"
                  small
                  color="blue lighten-3"
              ><v-icon small>mdi-refresh</v-icon> {{ timeStamp }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  small
                  v-if="!alarmState"
                  @click="alarmState = !alarmState"
                  target="_blank"
                  color="green lighten-3"
              >
                <v-icon>mdi-lock</v-icon>
                <span class="mr-2">Alarm on</span>
              </v-btn>
              <v-btn
                  small
                  v-if="alarmState"
                  @click="alarmState = !alarmState"
                  target="_blank"
                  color="red lighten-3"
              >
                <span class="mr-2">stolen</span>
                <v-icon>mdi-lock-open</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-12">
        <v-col align="center">
          <v-card v-if="location.lat && location.lng" width="95%" height="80%" class="card-outter" max-width="350">
            <GmapMap
                :center="{lat:location.lat, lng:location.lng}"
                :zoom = "this.zoom"
                style="width: 350px; height: 400px; margin: 32px auto"
                :options="{
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUi: false,
                  mapTypeControl: false,
                }"
            >
              <GmapMarker
                  v-if="myCoordinates"
                  ref="myCoordinates"
                  :position="{lat:myCoordinates.lat, lng:myCoordinates.lng}"/>
              <GmapMarker
                  ref="bike"
                  title="Bike"
                  :position="{lat:location.lat, lng:location.lng}"/>
            </GmapMap>
          </v-card>
          <p class="caption" v-if="!myCoordinates">Location not detected</p>
          <p class="caption" v-if="myCoordinates">Your Location:</p>
          <p class="caption" v-if="myCoordinates">Lat: {{myCoordinates.lat }} , Lng: {{myCoordinates.lng }}</p>
        </v-col>
      </v-row>
  </div>
</template>

<script>

export default {
  props: ['location', 'time', 'name'],
  watch: {
    location: function(newVal, oldVal) { // watch it
      this.bike.lat = newVal.lat
      this.bike.lng = newVal.lng
    },
    time: function(newVal) {
      this.timeStamp = newVal
    }
  },

  data() {
    return {
      alarmState: false,
      zoom: 15,
      myCoordinates: null,
      bike: {
        lat: null,
        lng: null,
      },
      timeStamp: null
    }
  },
  created() {

    //Load coordinates
    this.$getLocation({})
      .then(coordinates => {
        this.myCoordinates = coordinates
      })
      .catch(error => alert(error))
  },
  name: "Map"
  }
</script>

<style scoped>

</style>
