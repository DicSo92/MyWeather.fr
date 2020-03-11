<template>
    <div class="nightDayCurve">
        <ion-row>
            <ion-col size="10" offset="1" class="ion-no-padding">
                <div class="svgContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.96 78.12">
                        <path class="cls-1" d="M.47,78C30-10.94,174-10.95,200.96,78"/>
                        <g id="sunSvg">
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
                    </svg>
                </div>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="3" class="ion-no-padding">
                <ion-text color="light" class="ion-text-start">
                    <p class="dayTimeText ion-no-margin">{{(weatherData.infos.sys.sunrise+this.getTimezone)*1000 | moment("LT")}}</p>
                </ion-text>
            </ion-col>
            <ion-col size="6"></ion-col>
            <ion-col size="3" class="ion-no-padding">
                <ion-text color="light" class="ion-text-end">
                    <p class="dayTimeText ion-no-margin">{{(weatherData.infos.sys.sunset+this.getTimezone)*1000 | moment("LT")}}</p>
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
            return {}
        },
        created() {
        },
        mounted() {
        },
        watch: {

        },
        computed: {
            getTimezone () {
                return this.weatherData.infos.timezone-3600
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

            #sunSvg {
                transform-box: fill-box;
                transform-origin: center;
                offset-path: path("M.47,78C30-10.94,174-10.95,200.96,78");
                transition: offset-distance 4s ease-in-out 1s;
                offset-distance: 0;

                animation: move ease-in-out 800ms;
                opacity: 1;
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
