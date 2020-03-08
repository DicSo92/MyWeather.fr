<template>
    <ion-slide v-if="this.renderWeather" v-bind:key="city.infos.id + _.random(0, 1000)">
        <ion-item color="transparent">
            <ion-text color="light">
                <h4>{{city.infos.name}} ---</h4>
                <h4>{{this.currentData ? this.currentData.infos.weather[0].description : '--'}}</h4>
                <h3>{{this.currentData ? this.currentData.infos.name : '-'}}</h3>
                <h4>{{this.forecastData ? this.forecastData.list[0].clouds.all : '-(--'}}</h4>
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
                return this.getFavorites.findIndex(favorite => favorite.infos.id === this.city.infos.id) !== -1;
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
                this.$store.commit('removeFavorite', city.infos.id)
            },
            getCurrentWeatherData () {
                let nowUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER

                axios.get(nowUrl)
                    .then(response => {
                        console.log(response.data)
                        this.currentData = {infos: response.data, forecast: null}
                        if (!this.isFavorite) {
                            console.log('Get forecast if not favorite')
                            this.getWeatherForecastData()
                        } else {
                            console.log('favorite')
                            this.forecastData = this.city.forecast
                            this.renderWeather = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            getWeatherForecastData () {
                // if localstorage favoritesForecast time > 3h --> change it sinon ne pas faire la requete

                let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.city.infos.id + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                axios.get(forecastUrl)
                    .then(response => {
                        console.log('getForecast ')
                        console.log(response.data)
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
