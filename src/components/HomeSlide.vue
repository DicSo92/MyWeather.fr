<template>
    <ion-slide v-bind:key="city.infos.id">
        <div class="slideContainer ion-padding-bottom">
            <div class="currentInfosContainer">
                <ion-grid color="transparent" id="topContent">
                    <ion-row class="ion-margin-bottom ion-justify-content-between">
                        <ion-text color="light" class="ion-text-start" style="margin-left:5px">
                            <h4 class="refCityName">{{city.infos.name}}</h4>
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

                    <ion-row class="blueTransparent" id="weatherInfosRow">
                        <ion-col class="flexColCenter">
                            <ion-text color="light" class="ion-padding-start ion-padding-top ion-padding-bottom">
                                <i class="currentWeatherIcon wi"
                                   :class="this.currentWeatherData ? 'wi-owm-day-' + this.currentWeatherData.infos.weather[0].id : ''"></i>
                            </ion-text>
                        </ion-col>
                        <ion-col style="flex-grow: 2">
                            <ion-row>
                                <ion-col style="flex-grow: 2;">
                                    <ion-text color="light ion-text-start">
                                        <p class="weatherDegree">{{this.currentWeatherData ? _.round(this.currentWeatherData.infos.main.temp, 1) : '--'}} °C</p>
                                        <h4 class="weatherDescription">{{this.currentWeatherData ? this.currentWeatherData.infos.weather[0].description.toUpperCase() : '--'}}</h4>
                                    </ion-text>
                                </ion-col>
                                <ion-col size="3" class="flexColBetween">
                                    <div>
                                        <ion-text>
                                            <h6 class="ion-no-margin grayText">{{this.currentWeatherData ? _.round(this.currentWeatherData.infos.main.temp_min, 1) : '--'}}°</h6>
                                        </ion-text>
                                        <ion-text>
                                            <h6 class="ion-no-margin orangeText">{{this.currentWeatherData ? _.round(this.currentWeatherData.infos.main.temp_max, 1) : '--'}}°</h6>
                                        </ion-text>
                                    </div>
                                    <ion-text color="light">
                                        <h6 class="ion-no-margin">{{this.currentWeatherData ? _.round(this.currentWeatherData.infos.main.feels_like, 1) : '--'}}°</h6>
                                    </ion-text>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-justify-content-around ion-no-padding">

                        <ion-col class="nightDayParabolContainer">
                            <NightDayCurve v-if="this.currentWeatherData" :weatherData="this.currentWeatherData"></NightDayCurve>
                        </ion-col>

                        <ion-col class="flexColCenter">
                            <ion-row class="ion-justify-content-start ion-align-items-center">
                                <ion-text color="light">
                                    <i class="iconSize3 wi wi-wind" :class="this.currentWeatherData ? 'from-'  + this.currentWeatherData.infos.wind.deg + '-deg' : ''"></i>
                                </ion-text>
                                <ion-text color="light">
                                    <p class="ion-no-margin degree" style="margin-bottom: 5px;">{{this.currentWeatherData ?
                                        this.currentWeatherData.infos.wind.deg : '--'}}
                                        <span class="degreeSymbol">°</span>
                                    </p>
                                </ion-text>
                            </ion-row>
                            <ion-text color="light" class="ion-text-start">
                                <p class="ion-no-margin degree">
                                    {{this.currentWeatherData ? _.round(this.currentWeatherData.infos.wind.speed*3.6, 1) : '-'}}
                                    <span class="kmh"> km/h</span>
                                </p>
                            </ion-text>
                        </ion-col>

                        <ion-col class="flexColCenter">
                            <ion-row class="ion-align-items-center" style="margin-top: 2px">
                                <ion-text color="light">
                                    <i class="iconSize2 wi wi-raindrops"></i>
                                </ion-text>
                                <ion-text color="light">
                                    <p class="degree" style="margin: 0;">{{this.currentWeatherData ? this.currentWeatherData.infos.main.humidity : '-'}}%</p>
                                </ion-text>
                            </ion-row>
                            <ion-row class="ion-align-items-center">
                                <ion-text color="light">
                                    <i class="iconSize1 wi wi-barometer"></i>
                                </ion-text>
                                <ion-text color="light">
                                    <p class="degree" style="margin: 0;">{{this.currentWeatherData ? this.currentWeatherData.infos.main.pressure : '-'}}hPa</p>
                                </ion-text>
                            </ion-row>
                        </ion-col>

                    </ion-row>
                </ion-grid>
            </div>

            <div class="forecastInfosContainer" ref="forecastInfosContainer">
                <!--                <ion-text color="light" class="ion-text-start">Short term Forecast</ion-text>-->
                <div class="blueTransparent forecastInfos">
                    <ion-grid>
                        <ion-row>
                            <ion-text color="light">
                                <h6 class="weekDay">Mardi <span class="weekDayGrey">TODAY</span></h6>
                            </ion-text>
                        </ion-row>
                        <ion-row v-if="this.forecastData">
                            <SlideShortForecast :forecast="this.forecastData"></SlideShortForecast>
                        </ion-row>
                    </ion-grid>

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
    import NightDayCurve from '@/components/NightDayCurve.vue'

    export default {
        name: 'Home',
        components: {
            SlideShortForecast,
            ListDailyForecast,
            NightDayCurve
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
            getTimezone () {
                return this.currentWeatherData.infos.timezone-3600
            }
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
            getCurrentWeatherData() {
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
            getWeatherForecastData() {
                console.log(this.city.infos.name + ' == getForecast test 1')

                if (this.city.forecast) {
                    console.log(this.city.infos.name + ' == getForecast test 2')
                    if (this.city.forecast.list[0].dt < (Date.now() / 1000 + 12000)) { // Si forecast trop ancien
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

<style scoped lang="scss">
    .nightDayParabolContainer {
        display: flex;
        flex-direction: column;
        justify-content: start;
        flex-grow: 2;
    }
    #slidesPagesFav {
        height: 100%;
        color: white;
    }
    .refCityName {
        margin-top: 0;
        font-size: 20px;
    }
    .currentWeatherIcon {
        font-size: 55px;
    }
    .weatherDegree {
        font-size: 40px;
        margin: 0;
    }
    .iconSize1 {
        font-size: 17px;
        margin-right: 5px;
    }
    .iconSize2 {
        font-size: 24px;
        margin-right: 5px;
    }
    .iconSize3 {
        font-size: 27px;
        margin-right: 5px;
    }
    .degreeSymbol {
        font-size: 15px;
        color: gray;
    }
    .kmh {
        color: gray;
        font-size: 12px;
    }
    .degree {
        font-size: 12px;
    }
    .toolbar {
        border-bottom: 1px gray solid;
        color: white;
    }
    .swiper-slide {
        display: block;
    }
    .forecastHeader {
        border-bottom: 1px solid #ffffff60;
    }
    .weekDay {
        margin: 6px 6px 0;
    }
    .weekDayGrey {
        color: grey;
        font-size: 12px;
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
        /*flex-shrink: 0;*/
    }
    .forecastInfosContainer {
        /*flex-shrink: 0;*/
    }
    .forecastInfos {
    }
    .currentDate {
        font-size: 14px;
        color: grey;
        margin: 0;
    }
    .flexColStart {
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .flexColBetween {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .flexColCenter {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .weatherDescription {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color: #a9a9a9;
    }
    #topContent {
        height: 100%;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
    }
    #weatherInfosRow {
        flex-grow: 2;
        align-items: center;
    }
</style>
