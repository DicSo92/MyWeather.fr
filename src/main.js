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

const moment = require('moment')
require('moment/locale/fr')
// require('moment/locale/es')

Vue.use(require('vue-moment'), {
  moment
})
// Vue.prototype.moment = moment

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

Vue.use(Ionic)

let bus = new Vue
Vue.prototype.$bus = bus

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
