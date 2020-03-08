import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: null,
        currentSearch: null,
        currentLocation: null,
        favorites: [],
        sampleFavorite: [
            {
                infos: {name: 'paris', id: 145},
                forecast: {list: []}
            },
            {
                infos: {name: 'marseille', id: 145},
                forecast: null
            }
            ]
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
            state.favorites.splice(state.favorites.findIndex(favorite => favorite.infos.id === valId), 1)
        },
        editFavorite (state, val) {
            state.favorites.splice(state.favorites.findIndex(favorite => favorite.infos.id === val), 1, val)
        }
    },
    actions: {},
    modules: {}
})
