<template>
    <ion-slide v-bind:key="city.infos.id">
        <div class="slideContainer ion-padding-bottom">

            <div class="currentInfosContainer">
                <ion-grid color="transparent" id="topContent">

                    <ion-row class="ion-margin-bottom ion-justify-content-between">
                        <ion-text color="light" class="ion-text-start" style="margin-left:5px">
                            <h4 class="refCityName">
                                <ion-icon style="margin-right: 5px;" slot="icon-only" name="navigate" color="light" v-if="this.isCurrentLocation"></ion-icon>
                                {{city.infos.name}}
                            </h4>
                            <h6 class="currentDate">{{this.currentWeatherData ? this.$moment((this.currentWeatherData.infos.dt + this.getTimezone)*1000).format("LLLL") : '--'}}</h6>
                        </ion-text>
                        <ion-buttons>
                            <ion-button v-if="isFavorite" @click="removeFromFavorites(city)">
                                <ion-icon slot="icon-only"
                                          name="star"
                                          color="warning"></ion-icon>
                            </ion-button>
                            <ion-button v-if="!isFavorite" @click="addToFavorites(city)">
                                <ion-icon slot="icon-only"
                                          name="star-outline"
                                          color="light"></ion-icon>
                            </ion-button>
                        </ion-buttons>
                    </ion-row>
                    <DailyWeather v-if="this.currentWeatherData" :weatherData="this.currentWeatherData"></DailyWeather>
                    <DailyWeatherPlus v-if="this.currentWeatherData" :weatherData="this.currentWeatherData"></DailyWeatherPlus>

                </ion-grid>
            </div>
            <div ref="forecastInfosContainer">
                <div class="blueTransparent">
                    <SlideShortForecast v-if="this.forecastData" :forecast="this.forecastData"></SlideShortForecast>

                    <ListDailyForecast v-if="this.forecastData" :forecast="this.forecastData"></ListDailyForecast>
                </div>
            </div>

        </div>
    </ion-slide>
</template>

<script>
    import axios from 'axios'
    import SlideShortForecast from '@/components/SlideShortForecast.vue'
    import ListDailyForecast from '@/components/ListDailyForecast.vue'
    import DailyWeather from '@/components/DailyWeather.vue'
    import DailyWeatherPlus from '@/components/DailyWeatherPlus.vue'

    export default {
        name: 'Home',
        components: {
            SlideShortForecast,
            ListDailyForecast,
            DailyWeather,
            DailyWeatherPlus,
        },
        props: {
            city: Object,
        },
        data() {
            return {
                currentWeatherData: null,
                forecastData: null,
            }
        },
        mounted() {
            this.getCurrentWeatherData()
            this.getWeatherForecastData()
        },
        watch: {},
        computed: {
            getCurrentLocation() {
                return this.$store.state.currentLocation
            },
            getCurrentSearch() {
                return this.$store.state.currentSearch
            },
            getFavorites() {
                return this.$store.state.favorites
            },
            isFavorite() {
                return this.getFavorites.findIndex(favorite => favorite.infos.id === this.city.infos.id) !== -1
            },
            isCurrentSearch() {
                return this.getCurrentSearch.infos.id === this.city.infos.id
            },
            isCurrentLocation() {
                return this.getCurrentLocation ? this.getCurrentLocation.infos.id === this.city.infos.id : false
            },
            getTimezone () {
                return this.currentWeatherData.infos.timezone-3600
            },
            getLang () {
                return this.$store.state.lang
            }
        },
        methods: {
            addToFavorites(city) {
                if (this.getCurrentSearch && city.infos.id === this.getCurrentSearch.id) {
                    this.$store.commit('changeCurrentSearch', null)
                }
                this.$store.commit('addFavorite', {infos: this.currentWeatherData.infos, forecast: this.forecastData})
                this.$bus.$emit('changeCurrentIndex', 0)
            },
            removeFromFavorites(city) {
                this.$bus.$emit('changeCurrentIndex', 0)
                this.$bus.$emit('removeFromFavorites', city)
                this.$store.commit('removeFavorite', city.infos.id)
            },
            getCurrentWeatherData() {
                let nowUrl = 'https://api.openweathermap.org/data/2.5/weather?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER + '&lang=' + this.getLang

                axios.get(nowUrl)
                    .then(response => {
                        console.log(response.data)
                        this.currentWeatherData = {infos: response.data, forecast: null}
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            getWeatherForecastData() {
                // console.log(this.city.infos.name + ' == getForecast test 1')
                if (this.city.forecast) {
                    // console.log(this.city.infos.name + ' == getForecast test 2')
                    if (this.city.forecast.list[0].dt < (Date.now() / 1000)) { // Si forecast trop ancien
                        // console.log(this.city.infos.name + ' == getForecast test 3')
                        let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER + '&lang=' + this.getLang
                        axios.get(forecastUrl)
                            .then(response => {
                                this.forecastData = response.data
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    } else {
                        // console.log(this.city.infos.name + ' == getForecast test 4')
                        this.forecastData = this.city.forecast
                    }
                } else {
                    // console.log(this.city.infos.name + ' == getForecast test 5')
                    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER + '&lang=' + this.getLang
                    axios.get(forecastUrl)
                        .then(response => {
                            this.forecastData = response.data
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    #topContent {
        height: 100%;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
    }
    .refCityName {
        display: flex;
        align-items: center;
        margin-top: 0;
        font-size: 20px;
    }
    .blueTransparent {
        background-color: rgba(0, 5, 30, 0.3);
        border-radius: 10px;
        border: 1px solid #ffffff25;
    }
    .slideContainer {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .currentInfosContainer {
        flex-grow: 2;
    }
    .currentDate {
        font-size: 14px;
        color: grey;
        margin: 0;
    }
</style>
