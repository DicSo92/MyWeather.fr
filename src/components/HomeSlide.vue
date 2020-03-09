<template>
    <ion-slide v-bind:key="city.infos.id + _.random(0, 1000)">
        <ion-item color="transparent">
            <ion-text color="light">
                <h4 class="refCityName">{{city.infos.name}} ---</h4>
            </ion-text>
            <ion-buttons slot="end">
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
        </ion-item>
        <ion-item color="transparent">
            <ion-text color="light">
                <h4>{{this.currentWeatherData ? this.currentWeatherData.infos.weather[0].description : '--'}}</h4>
            </ion-text>
            <ion-text color="light" slot="end">
                <i class="currentWeatherIcon wi" :class="this.currentWeatherData ? 'wi-owm-day-' + this.currentWeatherData.infos.weather[0].id : ''"></i>
            </ion-text>
        </ion-item>
        <ion-item color="transparent">
            <ion-grid>
                <ion-row>
                    <ion-col size="6">
                        <ion-text color="light">

                        </ion-text>>
                    </ion-col>
                    <ion-col size="6">
                        <ion-text color="light">
                            <i class="currentWindIcon wi wi-wind" :class="this.currentWeatherData ? 'from-'  + this.currentWeatherData.infos.wind.deg + '-deg' : ''"></i>
                            <h5>Deg : {{this.currentWeatherData ? this.currentWeatherData.infos.wind.deg : '--'}}</h5>
                            <p>Speed : {{this.currentWeatherData ? this.currentWeatherData.infos.wind.speed : '-'}}</p>
                            <p>Gust : {{this.currentWeatherData ? this.currentWeatherData.infos.wind.gust : '-'}}</p>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-item>
        <ion-item color="transparent">
            <ion-text color="light">
                <h3>{{this.currentWeatherData ? this.currentWeatherData.infos.name : '-'}}</h3>
                <h4>first forecast clouds : {{this.forecastData ? this.forecastData.list[0].clouds.all : '-(--'}}</h4>
            </ion-text>
        </ion-item>
        <ion-grid>
            <ion-row>
                <ion-text color="light">Short term Forecast</ion-text>
            </ion-row>
            <ion-row v-if="this.forecastData">

                <SlideShortForecast :forecast="this.forecastData"></SlideShortForecast>

            </ion-row>

        </ion-grid>
    </ion-slide>
</template>

<script>
    import axios from 'axios'
    import SlideShortForecast from '@/components/SlideShortForecast.vue'

    export default {
        name: 'Home',
        components: {
            SlideShortForecast
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
            getCurrentSearch () {
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
        },
        methods: {
            addToFavorites(city) {
                if (this.getCurrentSearch && city.infos.id === this.getCurrentSearch.id) {
                    this.$store.commit('changeCurrentSearch', null)
                }
                this.$store.commit('addFavorite', {infos: city.infos, forecast: this.forecastData})
                if (this.getCurrentLocation && this.getCurrentLocation.id !== city.infos.id) {
                    this.$bus.$emit('slideTo', 1)
                }
            },
            removeFromFavorites(city) {
                this.$bus.$emit('changeCurrentIndex', 0)
                this.$bus.$emit('removeFromFavorites', city)
                this.$store.commit('removeFavorite', city.infos.id)
            },
            getCurrentWeatherData () {
                let nowUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER

                axios.get(nowUrl)
                    .then(response => {
                        console.log(response.data)
                        this.currentWeatherData = {infos: response.data, forecast: null}
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            getWeatherForecastData () {
                console.log(this.city.infos.name + ' == getForecast test 1')

                if (this.city.forecast) {
                    console.log(this.city.infos.name + ' == getForecast test 2')
                    if (this.city.forecast.list[0].dt < (Date.now()/1000 + 12000)) { // Si forecast trop ancien
                        console.log(this.city.infos.name + ' == getForecast test 3')
                        let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                        axios.get(forecastUrl)
                            .then(response => {
                                this.forecastData = response.data
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    } else {
                        console.log(this.city.infos.name + ' == getForecast test 4')
                        this.forecastData = this.city.forecast
                    }
                } else {
                    console.log(this.city.infos.name + ' == getForecast test 5')
                    let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
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

<style lang="scss">
    #slidesPagesFav {
        height: 100%;
        color: white;
    }
    .currentWeatherIcon {
        font-size: 80px;
    }
    .currentWindIcon {
        font-size: 40px;
    }

    .toolbar {
        border-bottom: 1px gray solid;
        color: white;
    }

    .swiper-slide {
        display: block;
    }

    .bg-gray {
        background-color: gray;
        border: solid black 1px;
    }

    .bg-blue-dark {
        /*background-color: #000148;*/
    }
</style>
