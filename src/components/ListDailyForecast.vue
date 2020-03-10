<template>
    <ion-content overflow-scroll="true" color="transparent" class="listDays">
        <ion-list id="searchList">

            <ListDailyForecastItem v-for="(day, index) in forecastDay" :dailyForecast="day"></ListDailyForecastItem>

        </ion-list>
    </ion-content>
</template>

<script>
    import ListDailyForecastItem from '@/components/ListDailyForecastItem.vue'

    export default {
        name: 'ListDailyForecast',
        components: {
            ListDailyForecastItem
        },
        props: {
            forecast: Object,
        },
        data() {
            return {
                forecastDay: [],
            }
        },
        mounted() {
            let dayList = []
            this.forecast.list.forEach((forecastHourly) => {
                dayList.push(this.$moment(forecastHourly.dt*1000).format("D"))
            })
            dayList = dayList.filter((a, b) => dayList.indexOf(a) === b)


            let listDailyArray = []
            dayList.forEach((day) => {
                let dailyArray = this.forecast.list.filter(hourly => this.$moment(hourly.dt*1000).format("D") === day)
                listDailyArray.push(dailyArray)
            })
            this.forecastDay = listDailyArray
        },
        watch: {},
        computed: {
        },
        methods: {
        },
    }
</script>

<style lang="scss">
    .listDays  {
        height: 25vh;
        overflow-y: scroll;
        display: block;
        border-top: 1px solid #757575;
    }
    #searchList {
        background-color: transparent;
        .containerItem {
            border-bottom: 1px solid white;
        }
    }
    .grayText {
        color: gray;
    }
    .orangeText {
        color: coral;
    }
</style>
