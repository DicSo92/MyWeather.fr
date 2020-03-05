import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// ---------------------------------------------------------------------------------------------------------------------
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import '@/assets/css/custom-ionic.scss'

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
