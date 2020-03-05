import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: null
  },
  getters: {},
  mutations: {
    changeCities(state, val) {
      state.cities = val
    },
  },
  actions: {},
  modules: {}
})
