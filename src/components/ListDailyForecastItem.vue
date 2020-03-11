<template>
    <ion-grid color="transparent" class="containerItem">
        <ion-row class="ion-align-items-center">
            <ion-col size="4">
                <ion-label color="light" class="ion-float-start">
                    {{dailyForecast[0].dt | moment("dddd")}}
                </ion-label>
            </ion-col>
            <ion-col size="4" class="ion-text-center">
                <ion-text color="light">
                    <i class="currentWeatherIcon wi" :class="'wi-owm-' + dailyForecast[0].weather[0].id"></i>
                </ion-text>
            </ion-col>
            <ion-col size="4">
                <ion-row class="ion-justify-content-around ion-no-padding">
                    <ion-col class="ion-no-padding">
                        <ion-text>
                            <h6 class="ion-no-margin grayText">{{this.getMinTemp}}°</h6>
                        </ion-text>
                    </ion-col>
                    <ion-col class="ion-no-padding">
                        <ion-text>
                            <h6 class="ion-no-margin orangeText">{{this.getMaxTemp}}°</h6>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
    export default {
        name: 'ListDailyForecastItem',
        components: {
        },
        props: {
            dailyForecast: Array,
        },
        data() {
            return {
            }
        },
        created () {
        },
        mounted() {
        },
        watch: {},
        computed: {
            getMinTemp () {
                return _.round(this.dailyForecast.reduce((prev, curr) => prev.main.temp < curr.main.temp ? prev : curr).main.temp, 1)
            },
            getMaxTemp () {
                return _.round(this.dailyForecast.reduce((prev, curr) => prev.main.temp > curr.main.temp ? prev : curr).main.temp, 1)
            }
        },
        methods: {
        },
    }
</script>

<style lang="scss">
    .grayText {
        color: gray;
    }
    .orangeText {
        color: coral;
    }
</style>
