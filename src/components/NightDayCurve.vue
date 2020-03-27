<template>
    <div class="nightDayCurve">
        <ion-row>
            <ion-col size="10" offset="1" class="ion-no-padding">
                <div class="svgContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.96 78.12">
                        <path class="cls-1" d="M.47,78C30-10.94,174-10.95,200.96,78"/>
                        <g id="sunSvg" :style="this.showCurveSun ? {offsetDistance: getPercentDay + '%' } : {offsetDistance: '0%' }" v-show="this.showCurveSun && getPercentDay > 0 && getPercentDay < 100">
                            <circle class="cls-2" cx="68.04" cy="15.79" r="6.95"/>
                            <line class="cls-3" x1="68.04" y1="7.88" x2="68.04"/>
                            <line class="cls-3" x1="75.96" y1="15.79" x2="83.84" y2="15.79"/>
                            <line class="cls-3" x1="52.25" y1="15.79" x2="60.13" y2="15.79"/>
                            <line class="cls-3" x1="68.04" y1="31.59" x2="68.04" y2="23.71"/>
                            <line class="cls-3" x1="56.88" y1="4.62" x2="62.44" y2="10.19"/>
                            <line class="cls-3" x1="73.64" y1="21.39" x2="79.21" y2="26.96"/>
                            <line class="cls-3" x1="73.64" y1="10.2" x2="79.21" y2="4.63"/>
                            <line class="cls-3" x1="56.88" y1="26.96" x2="62.44" y2="21.39"/>
                        </g>
                        <g id="sunSvg" :style="this.showCurveSun ? {offsetDistance: getPercentNight + '%' } : {offsetDistance: '0%' }" v-show="this.showCurveSun && getPercentNight > 0 && getPercentNight < 100">
                            <path d="M112.76,20.71a9.1,9.1,0,0,1-6.48-2.33,8.59,8.59,0,0,1-2.83-5.09,8.69,8.69,0,0,1,2.65-8.1,8.69,8.69,0,0,1,6.51-2.48,2,2,0,0,1,.34,0A.71.71,0,0,1,113.26,4a11.24,11.24,0,0,0-1,.81,6.25,6.25,0,0,0-1.72,5.41,6.07,6.07,0,0,0,2.19,4,5.1,5.1,0,0,0,6.35,0c.23-.19.44-.41.66-.61a.69.69,0,0,1,.89-.12.66.66,0,0,1,.25.83,8.9,8.9,0,0,1-6.38,6.05A13.83,13.83,0,0,1,112.76,20.71ZM120.35,14l0,0-.2.17c-.35.29-.68.6-1,.85a5.68,5.68,0,0,1-7-.66,7.15,7.15,0,0,1-1.64-7.72,6.5,6.5,0,0,1,2.43-3,.9.9,0,0,0,.15-.18c-.06,0-.11-.08-.17-.08a12.6,12.6,0,0,0-1.74.07,8.06,8.06,0,0,0-4.62,2.3,8.18,8.18,0,0,0-2.52,5.46,8,8,0,0,0,1.69,5.56A8,8,0,0,0,113.68,20a8.09,8.09,0,0,0,6.61-5.66A2.27,2.27,0,0,0,120.35,14Z"/>
                            <path d="M116.6,12.29a.57.57,0,0,1-.6-.49,5.21,5.21,0,0,0-.08-.55,1.51,1.51,0,0,0-1.48-1.16c-.43,0-.68-.26-.67-.61s.26-.56.7-.6a1.48,1.48,0,0,0,1.45-1.15,4.67,4.67,0,0,0,.08-.52.59.59,0,0,1,1.18,0,4.8,4.8,0,0,0,.12.66,1.4,1.4,0,0,0,1.16,1l.38,0a.62.62,0,0,1,.57.6.64.64,0,0,1-.58.61,2.49,2.49,0,0,0-.73.15,1.43,1.43,0,0,0-.89,1.29C117.17,12,117,12.29,116.6,12.29Zm0-.79a2.21,2.21,0,0,1,.64-1.39,2.09,2.09,0,0,1,1.37-.61,2.15,2.15,0,0,1-2-2A2.09,2.09,0,0,1,116,8.89a2.29,2.29,0,0,1-1.41.62A2.12,2.12,0,0,1,116.58,11.5Z"/>
                            <path d="M119.73,6.67a.58.58,0,0,1-.6-.57c-.09-.66-.29-.86-.95-.94a.61.61,0,0,1-.57-.61.59.59,0,0,1,.57-.59c.66-.08.86-.28.95-.94a.6.6,0,0,1,1.2,0,.87.87,0,0,0,.94.92.61.61,0,0,1,.59.59.59.59,0,0,1-.55.61c-.69.09-.86.26-1,1A.58.58,0,0,1,119.73,6.67Zm-1.26-2.12a1.53,1.53,0,0,1,1.27,1.34A1.53,1.53,0,0,1,121,4.55a1.52,1.52,0,0,1-1.24-1.35A1.53,1.53,0,0,1,118.47,4.55Z"/>
                            <path class="cls-4"
                                  d="M120.35,14a2.27,2.27,0,0,1-.06.25A8.09,8.09,0,0,1,113.68,20a8,8,0,0,1-8.07-3.23,8,8,0,0,1-1.69-5.56,8.18,8.18,0,0,1,2.52-5.46,8.06,8.06,0,0,1,4.62-2.3,12.6,12.6,0,0,1,1.74-.07c.06,0,.11,0,.17.08a.9.9,0,0,1-.15.18,6.5,6.5,0,0,0-2.43,3.05A7.15,7.15,0,0,0,112,14.36a5.68,5.68,0,0,0,7,.66c.37-.25.7-.56,1-.85l.2-.17Z"/>
                            <path class="cls-5"
                                  d="M116.58,11.5a2.12,2.12,0,0,0-2-2A2.29,2.29,0,0,0,116,8.89a2.09,2.09,0,0,0,.63-1.35,2.15,2.15,0,0,0,2,2,2.09,2.09,0,0,0-1.37.61A2.21,2.21,0,0,0,116.58,11.5Z"/>
                            <path class="cls-5"
                                  d="M118.47,4.55a1.53,1.53,0,0,0,1.27-1.35A1.52,1.52,0,0,0,121,4.55a1.53,1.53,0,0,0-1.24,1.34A1.53,1.53,0,0,0,118.47,4.55Z"/>
                        </g>
                    </svg>
                </div>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="3" class="ion-no-padding">
                <ion-text color="light" class="ion-text-start">
                    <p class="dayTimeText ion-no-margin">{{getTimeSunriseSunset.first}}</p>
                </ion-text>
            </ion-col>
            <ion-col size="6"></ion-col>
            <ion-col size="3" class="ion-no-padding">
                <ion-text color="light" class="ion-text-end">
                    <p class="dayTimeText ion-no-margin">{{getTimeSunriseSunset.second}}</p>
                </ion-text>
            </ion-col>
        </ion-row>
    </div>
</template>

<script>
    export default {
        name: 'NightDayCurve',
        components: {

        },
        props: {
            weatherData: Object,
        },
        data() {
            return {
                showCurveSun: true
            }
        },
        created() {
        },
        mounted() {
            this.$bus.$on('showCurveSun', (cityId) => {
                this.showCurveSun = false
                if (cityId === this.weatherData.infos.id) {
                    this.$nextTick(() => {
                        this.showCurveSun = true
                    })
                }
            })
        },
        watch: {
            getCurrentSlideData (val) {
                this.showCurveSun = false
                if (val.infos.id === this.weatherData.infos.id) {
                    this.$nextTick(() => {
                        this.showCurveSun = true
                    })
                }
            },
        },
        computed: {
            getCurrentSlideData () {
                return this.$store.state.currentSlideData
            },
            getTimezone () {
                return this.weatherData.infos.timezone - 3600
            },
            getPercentDay () {
                let dayTime = this.weatherData.infos.dt
                let sunrise = this.weatherData.infos.sys.sunrise
                let sunset = this.weatherData.infos.sys.sunset

                let percentage
                percentage = _.round( (((dayTime - sunrise) / (sunset - sunrise)) * 100), 2)

                return percentage
            },
            getPercentNight () {
                let dayTime = this.weatherData.infos.dt
                let sunrise = this.weatherData.infos.sys.sunrise
                let sunset = this.weatherData.infos.sys.sunset

                let percentage
                if (dayTime > sunset) percentage = _.round( (((dayTime - sunset) / ((sunrise + 86400) - sunset)) * 100), 2)
                if (dayTime < sunrise) percentage = _.round( (((dayTime - (sunset - 86400)) / (sunrise - (sunset - 86400))) * 100), 2)

                return percentage
            },
            getTimeSunriseSunset () {
                if (this.getPercentDay > 0 && this.getPercentDay < 100) {
                    return {
                        first: this.$moment((this.weatherData.infos.sys.sunrise + this.getTimezone) * 1000).format("LT"),
                        second: this.$moment((this.weatherData.infos.sys.sunset + this.getTimezone) * 1000).format("LT"),
                    }
                } else if (this.getPercentNight > 0 && this.getPercentNight < 100) {
                    return {
                        first: this.$moment((this.weatherData.infos.sys.sunset + this.getTimezone) * 1000).format("LT"),
                        second: this.$moment((this.weatherData.infos.sys.sunrise + this.getTimezone) * 1000).format("LT"),
                    }
                }
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .dayTimeText {
        font-size: 12px;
    }
    .svgContainer {
        svg {
            overflow: visible !important;

            .cls-1 {fill: none;stroke: #f7931e;}
            .cls-1, .cls-3 {stroke-miterlimit: 10;}
            .cls-2, .cls-3 {fill: #fcee21;}
            .cls-3 {stroke: #fbd63b;stroke-width: 1.5px;}
            .cls-4{fill:#ffcf48;}
            .cls-5{fill:#ffbc33;}

            #sunSvg {
                transform-box: fill-box;
                transform-origin: center;
                offset-path: path("M.47,78C30-10.94,174-10.95,200.96,78");
                transition: offset-distance 2s ease-in-out;
                offset-distance: 0;

                animation: move ease-in-out 500ms;
                /*opacity: 0;*/
                transform: scale(1);
            }
        }
    }
    @keyframes move {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
