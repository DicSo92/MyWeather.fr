<template>
    <ion-slide v-if="this.renderWeather" v-bind:key="city.id + _.random(0, 1000)">
        <ion-item color="transparent">
            <ion-text color="light">
                <h4>{{city.name}}</h4>
                <h3>{{this.currentData ? this.currentData.name : ''}}</h3>
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
        <ion-grid>
            <ion-row>
                <ion-col size="4" class="bg-gray">
                    col 4
                </ion-col>
                <ion-col size="4" class="bg-gray">
                    col 4
                </ion-col>
                <ion-col size="4" class="bg-gray">
                    col 4
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-slide>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Home',
        components: {},
        props: {
            city: Object,
        },
        data() {
            return {
                currentData: null,
                forecastData: null,
                renderWeather: true
            }
        },
        mounted() {
            this.getCurrentWeatherData()
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
                return this.getFavorites.findIndex(favorite => favorite.id === this.city.id) !== -1;
            },
        },
        methods: {
            addToFavorites(city) {
                if (this.getCurrentSearch && city.id === this.getCurrentSearch.id) {
                    this.$store.commit('changeCurrentSearch', null)
                }
                this.$store.commit('addFavorite', city)
                if (this.getCurrentLocation && this.getCurrentLocation.id !== city.id) {
                    this.$bus.$emit('slideTo', 1)
                }
            },
            removeFromFavorites(city) {
                this.$bus.$emit('changeCurrentIndex', 0)
                this.$store.commit('removeFavorite', city.id)
            },
            getCurrentWeatherData () {
                let nowUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + this.city.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                axios.get(nowUrl)
                    .then(response => {
                        this.currentData = response.data
                        if (this.getFavorites.findIndex(favorite => favorite.id === this.city.id) === -1) {
                            this.getWeatherForecastData()
                            console.log('not in storage')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            getWeatherForecastData () {
                // if localstorage favoritesForecast time > 3h --> change it sinon ne pas faire la requete

                let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.city.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                axios.get(forecastUrl)
                    .then(response => {
                        console.log('getForecast ')
                        this.forecastData = response.data
                        this.renderWeather = true
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
        },
    }
</script>

<style lang="scss">
    #slidesPagesFav {
        height: 100%;
        color: white;
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
