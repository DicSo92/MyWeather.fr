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
            getFavorites(val) {
                this.storeLocal('favorites', val)
                // this.getWeatherForecast()
            },
            getCurrentLocation(val) {
                this.storeLocal('currentLocation', val)
            },
            getFavoritesForecast(val) {
                this.storeLocal('favoritesForecast', val)
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
            },
            getFavoritesForecast() {
                return this.$store.state.favoritesForecast
            }
        },
        methods: {
            storeLocal: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            storeVueX: function (name, data) {
                this.$store.commit(name, data)
            },
            getWeatherForecast () {
                // if localstorage favoritesForecast time > 3h --> change it sinon ne pas faire la requete
                console.log('----------------')
                console.log(this.getFavoritesForecast)
                if (this.getFavoritesForecast.favoritesForecastDatas.length === 0) {
                    let favoritesForecastDatas = []
                    let dateForecast = 0
                    for (let favorite in this.getFavorites) {
                        let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + favorite.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                        axios.get(forecastUrl)
                            .then(response => {
                                console.log('aucun favoritesForecast')
                                favoritesForecastDatas.push(response.data)
                                dateForecast = response.data.list[0].dt
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                    let newFavoritesForecastDatas = { time: dateForecast, favoritesForecastDatas: favoritesForecastDatas}
                    this.$store.commit('changeFavoritesForecast', newFavoritesForecastDatas)
                } else {
                    let favoritesForecastDatas = []
                    let dateForecast = 0
                    let newF = this.getFavoritesForecast.favoritesForecastDatas
                    for (let favorite in this.getFavorites) {
                        let favIndex = this.getFavoritesForecast.favoritesForecastDatas.findIndex(fav => fav.id === favorite.id)
                        if (favIndex !== -1) {
                            console.log('find in favorite')
                            if (this.getFavoritesForecast.favoritesForecastDatas[favIndex].list[0].dt < Date.now()) { // nouvel requete
                                let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + favorite.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                                axios.get(forecastUrl)
                                    .then(response => {
                                        console.log('new request 3h')
                                        newF = newF.splice(favIndex, 1, response.data)
                                        dateForecast = response.data.list[0].dt
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                        } else {
                            let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + favorite.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                            axios.get(forecastUrl)
                                .then(response => {
                                    console.log('not find in favorite')
                                    newF = newF.splice(favIndex, 1, response.data)
                                    dateForecast = response.data.list[0].dt
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }
                    }
                    let newFavoritesForecastDatas = { time: dateForecast, favoritesForecastDatas: newF}
                    this.$store.commit('changeFavoritesForecast', newFavoritesForecastDatas)
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
