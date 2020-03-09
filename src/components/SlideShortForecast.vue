<template>
    <ion-slides class="shortForecastSlide" pager="true" :options="this.slideOpts">
        <ion-slide v-for="fourForecast in this.forecastArray" id="slidesContainer">
            <ion-grid>
                <ion-row v-if="forecast">
                    <ion-col size="3" class="forecastItem" v-for="(forecast, index) in fourForecast">
                        <ion-text color="light">
                            <i class="forecastWeatherIcon wi" :class="'wi-owm-' + forecast.weather[0].id"></i>
                        </ion-text>
<!--                        {{forecast.dt | moment("hA")}}-->
                        {{forecast.dt | moment("from", "now", true)}}
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-slide>
<!--        <ion-slide>-->
<!--            <ion-grid>-->
<!--                <ion-row v-if="forecast">-->
<!--                    <ion-col size="3" class="bg-gray" v-for="(forecast, index) in forecast.list.slice(0, 4)">-->
<!--                        {{forecast.wind.speed}}-->
<!--                    </ion-col>-->
<!--                </ion-row>-->
<!--            </ion-grid>-->
<!--        </ion-slide>-->
    </ion-slides>
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        props: {
            forecast: Object,
        },
        data() {
            return {
                slideOpts: {
                    initialSlide: 1,
                    speed: 400,
                    pager: true
                },
                forecastArray: []
            }
        },
        mounted() {
            for (let i = 1; i < 6; i++) {
                this.forecastArray.push(this.forecast.list.slice(i*4-4,i*4))
            }
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

        },
    }
</script>

<style lang="scss">
    #slidesContainer {
        padding-bottom: 25px;
    }
    .shortForecastSlide {
        --bullet-background: white;
        --bullet-background-active: white;
    }
    .forecastItem {
        border-right: 1px solid #aaaaaa;
        border-left: 1px solid #aaaaaa;
    }

    .forecastWeatherIcon {
        font-size: 30px
    }
</style>
