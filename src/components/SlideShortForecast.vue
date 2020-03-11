<template>
        <ion-slides class="shortForecastSlide" pager="true" :options="this.slideOpts">
            <ion-slide v-for="fourForecast in this.forecastArray" id="slidesContainer">
                <ion-grid>
                    <ion-row v-if="forecast" class="rowContainer">
                        <ion-col size="3" class="forecastItem" v-for="(forecast, index) in fourForecast">
                            <ion-text color="light">
                                <p class="ion-no-margin" style="font-size: 11px; color: gray">
                                    {{(forecast.dt + getTimezone)*1000 | moment("dddd")}}
                                </p>
                            </ion-text>
                            <div class="forecastText">
                                <ion-text color="light">
                                    <p class="ion-no-margin" style="font-size: 12px;">
                                        {{(forecast.dt + getTimezone)*1000 | moment("LT")}}
                                    </p>
                                    <i class="forecastWeatherIcon wi" :class="'wi-owm-' + forecast.weather[0].id"></i>
                                    <p class="ion-no-margin" style="font-size: 14px;">
                                        {{_.round(forecast.main.temp, 1)}}°
                                    </p>
                                </ion-text>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-slide>
        </ion-slides>
</template>

<script>
    export default {
        name: 'SlideShortForecast',
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
                forecastArray: [],
                test: false
            }
        },
        beforeCreate () {
        },
        mounted() {
            for (let i = 1; i < 6; i++) {
                this.forecastArray.push(this.forecast.list.slice(i*4-4,i*4))

            }
        },
        watch: {
        },
        computed: {
            getTimezone () {
                return this.forecast.city.timezone - 3600
            }
        },
        methods: {
        },
    }
</script>

<style lang="scss">
    #slidesContainer {
        padding-bottom: 10px;
    }
    .shortForecastSlide {
        --bullet-background: white;
        --bullet-background-active: white;
        /*border-top: 1px solid #757575;*/
    }
    .forecastItem {
        padding-left: 0;
        padding-right: 0;
    }
    .rowContainer {
        .forecastItem:last-child {
            .forecastText {
                border-right: 1px solid #ffffff50;
            }
        }
    }
    .forecastText {
        border-left: 1px solid #ffffff50;
    }
    .forecastWeatherIcon {
        font-size: 30px
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: 0px;
        left: 0;
        width: 100%;
    }
</style>
