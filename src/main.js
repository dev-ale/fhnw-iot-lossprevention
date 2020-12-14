import Vue from 'vue'
import App from './App.vue'
import VueGeolocation from "vue-browser-geolocation/src"
import * as VueGoogleMaps from 'vue2-google-maps'
import {install} from "vue2-google-maps/dist/main"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_KEY',
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
