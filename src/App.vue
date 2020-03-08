<template>
    <div id="app">
        <ion-app id="backgroundImg">
            <ion-vue-router/>
        </ion-app>
    </div>
</template>

<script>
    import axios from 'axios'
    import CitiesJson from '@/ressources/city.list.min.json'

    export default {
        name: 'modal',
        data() {
            return {}
        },
        created() {
            this.storeVueX('changeCities', JSON.parse(JSON.stringify(CitiesJson)))
        },
        mounted() {
            if (localStorage.getItem('favorites')) this.storeVueX('changeFavorites', JSON.parse(localStorage.getItem('favorites')))
            if (localStorage.getItem('favoritesForecast')) this.storeVueX('changeFavoritesForecast', JSON.parse(localStorage.getItem('favorites')))
        },
        watch: {
            getCurrentSearch(val) {
                this.storeLocal('currentSearch', val)
            },
            getFavorites(val, old) {
                this.storeLocal('favorites', val)
                this.getWForecast(val)
            },
            getCurrentLocation(val) {
                this.storeLocal('currentLocation', val)
            }
        },
        computed: {
            getCurrentSearch() {
                return this.$store.state.currentSearch
            },
            getFavorites() {
                return this.$store.state.favorites
            },
            getCurrentLocation() {
                return this.$store.state.currentLocation
            }
        },
        methods: {
            storeLocal: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            storeVueX: function (name, data) {
                this.$store.commit(name, data)
            },

            getWForecast (favorites) {
                let i = 0
                console.log(favorites)
                if (favorites.infos) {
                    for (let fav in favorites) {
                        if (!fav.forecast) {
                            console.log(fav)
                            let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + fav.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                            axios.get(forecastUrl)
                                .then(response => {
                                    console.log('aucun favoritesForecast pour => ' + !fav.infos.name + ' -- Du coup ajout')

                                    this.$store.commit('editFavorite', {infos: fav.infos, forecast: response.data})
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        } else {
                            if (fav.forecast.list[0].dt < Date.now - 12000) { // Si forecast trop ancien
                                let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + fav.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                                axios.get(forecastUrl)
                                    .then(response => {
                                        console.log('Forecast trop ancien pour => ' + !fav.infos.name + ' -- Du coup edit')

                                        this.$store.commit('editFavorite', {infos: fav.infos, forecast: response.data})
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                        }
                        i ++
                    }
                }
            },

            forceRerender() {
                this.renderComponent = false;
                this.$nextTick(() => {
                    this.renderComponent = true;
                })
            }
        }
    }
</script>

<style lang="scss">
    #backgroundImg {
        background-color: #000013;
    }
</style>
