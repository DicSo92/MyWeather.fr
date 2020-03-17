<template>
    <ion-grid class="no-padding-bottom">
        <ion-row>
            <ion-text color="light">
                <h6 class="weekDay">
                    {{(this.dayTimeSlide + getTimezone)*1000 | moment("dddd")}}
                    <span class="weekDayGrey">
                        {{(this.dayTimeSlide + getTimezone)*1000 | moment("from", "now", true).toUpperCase()}}
                    </span>
                </h6>
            </ion-text>
        </ion-row>
        <ion-row>
            <ion-slides class="shortForecastSlide" pager="true" :options="this.slideOpts" @ionSlideDidChange="slideChanged" ref="slideForecast">
                <ion-slide v-for="fourForecast in this.forecastArray" id="slidesContainer">
                    <ion-grid class="gridForecast">
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
        </ion-row>
    </ion-grid>
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
                dayTimeSlide: this.forecast.list[0].dt
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
            async slideChanged() {
                this.$refs.slideForecast.getActiveIndex().then(index => {
                    this.dayTimeSlide = this.forecastArray[index][0].dt
                })
            },
        },
    }
</script>

<style scoped lang="scss">
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
    .weekDay {
        margin: 5px 6px 0;
        font-size: 12px;
        text-transform: capitalize;
    }
    .weekDayGrey {
        color: grey;
        font-size: 10px;
    }
    .gridForecast {
        padding-top: 0;
        padding-bottom: 10px;
    }
    .no-padding-bottom {
        padding-bottom: 0;
    }
</style>
