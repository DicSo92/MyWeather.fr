import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// ---------------------------------------------------------------------------------------------------------------------
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import '@/assets/css/custom-ionic.scss'

import 'weather-icons-npm/css/weather-icons.css'
import 'weather-icons-npm/css/weather-icons-wind.css'

import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-158903528-2" }
});

const moment = require('moment')
require('moment/locale/fr')
// require('moment/locale/es')

Vue.use(require('vue-moment'), {
  moment
})
// Vue.prototype.moment = moment

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import i18n from './i18n'

Vue.prototype.$ti18n = i18n

Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

Vue.use(Ionic)

let bus = new Vue
Vue.prototype.$bus = bus

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
