import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: null,
        currentSearch: null,
        currentLocation: null,
        currentSlideData: null,
        favorites: [],
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
        changeCurrentSlideData(state, val) {
            state.currentSlideData = val
        },
        addFavorite(state, city) {
            state.favorites.push(city)
        },
        removeFavorite(state, valId) {
            state.favorites.splice(state.favorites.findIndex(favorite => favorite.infos.id === valId), 1)
        },
        editFavorite (state, val) {
            state.favorites.splice(state.favorites.findIndex(favorite => favorite.infos.id === val), 1, val)
        }
    },
    actions: {},
    modules: {}
})
