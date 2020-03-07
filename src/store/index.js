import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: null,
    currentSearch: null,
    currentLocation: null,
    favorites: [],
    favoritesForecast: { time: 0, favoritesForecastDatas: [] }
  },
  getters: {},
  mutations: {
    changeCities(state, val) {
      state.cities = val
    },
    changeCurrentSearch(state, val) {
      state.currentSearch = val
    },
    changeCurrentLocation(state, val) {
      state.currentLocation = val
    },
    changeFavorites(state, val) {
      state.favorites = val
    },
    addFavorite(state, city) {
      state.favorites.unshift(city)
    },
    removeFavorite(state, valId) {
      state.favorites.splice(state.favorites.findIndex(favorite => favorite.id === valId), 1)
    },
    changeFavoritesForecast(state, val) {
      state.favoritesForecast = val
    },
  },
  actions: {},
  modules: {}
})
