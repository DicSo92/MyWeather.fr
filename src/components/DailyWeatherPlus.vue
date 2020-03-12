<template>
    <ion-row class="ion-justify-content-around ion-no-padding">

        <ion-col class="nightDayParabolContainer">
            <NightDayCurve :weatherData="weatherData"></NightDayCurve>
        </ion-col>

        <ion-col class="flexColCenter">
            <ion-row class="ion-justify-content-start ion-align-items-center">
                <ion-text color="light">
                    <i class="iconSize3 wi wi-wind" :class="'from-'  + weatherData.infos.wind.deg + '-deg'"></i>
                </ion-text>
                <ion-text color="light">
                    <p class="ion-no-margin smallText" style="margin-bottom: 5px;">{{weatherData.infos.wind.deg}}
                        <span class="degreeSymbol">°</span>
                    </p>
                </ion-text>
            </ion-row>
            <ion-text color="light" class="ion-text-start">
                <p class="ion-no-margin smallText">
                    {{_.round(weatherData.infos.wind.speed*3.6, 1)}}
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
                    <p class="smallText" style="margin: 0;">{{weatherData.infos.main.humidity}}%</p>
                </ion-text>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-text color="light">
                    <i class="iconSize1 wi wi-barometer"></i>
                </ion-text>
                <ion-text color="light">
                    <p class="smallText" style="margin: 0;">{{weatherData.infos.main.pressure}}hPa</p>
                </ion-text>
            </ion-row>
        </ion-col>

    </ion-row>
</template>

<script>
    import NightDayCurve from '@/components/NightDayCurve.vue'

    export default {
        name: 'DailyWeatherPlus',
        components: {
            NightDayCurve
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
    .nightDayParabolContainer {
        display: flex;
        flex-direction: column;
        justify-content: start;
        flex-grow: 2;
    }
    .flexColCenter {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .smallText {
        font-size: 12px;
    }
    .degreeSymbol {
        font-size: 15px;
        color: gray;
    }
    .kmh {
        color: gray;
        font-size: 12px;
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
</style>
