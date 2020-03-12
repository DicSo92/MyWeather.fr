<template>
    <ion-row class="blueTransparent" id="weatherInfosRow">
        <ion-col class="flexCol ion-justify-content-center">
            <ion-text color="light" class="ion-padding-start ion-padding-top ion-padding-bottom">
                <i class="currentWeatherIcon wi"
                   :class="'wi-owm-day-' + weatherData.infos.weather[0].id"></i>
            </ion-text>
        </ion-col>
        <ion-col class="grow2">
            <ion-row>
                <ion-col class="grow2">
                    <ion-text color="light ion-text-start">
                        <p class="weatherDegree">{{_.round(weatherData.infos.main.temp, 1)}} °C</p>
                        <h4 class="weatherDescription">{{weatherData.infos.weather[0].description.toUpperCase()}}</h4>
                    </ion-text>
                </ion-col>
                <ion-col size="3" class="flexCol ion-justify-content-between">
                    <div>
                        <ion-text>
                            <h6 class="ion-no-margin grayText">{{_.round(weatherData.infos.main.temp_min, 1)}}°</h6>
                        </ion-text>
                        <ion-text>
                            <h6 class="ion-no-margin orangeText">{{_.round(weatherData.infos.main.temp_max, 1)}}°</h6>
                        </ion-text>
                    </div>
                    <ion-text color="light">
                        <h6 class="ion-no-margin">{{_.round(weatherData.infos.main.feels_like, 1)}}°</h6>
                    </ion-text>
                </ion-col>
            </ion-row>
        </ion-col>
    </ion-row>
</template>

<script>
    export default {
        name: 'DailyWeather',
        components: {
        },
        props: {
            weatherData: Object,
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        watch: {
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
    #weatherInfosRow {
        flex-grow: 2;
        align-items: center;
    }
    .currentWeatherIcon {
        font-size: 55px;
    }
    .weatherDegree {
        font-size: 40px;
        margin: 0;
    }
    .weatherDescription {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color: #a9a9a9;
    }


    .flexCol {
        display: flex;
        flex-direction: column;
    }
    .grow2 {
        flex-grow: 2;
    }
</style>
