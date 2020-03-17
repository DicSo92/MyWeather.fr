<template>
    <div id="app">
        <ion-app id="backgroundImg">
            <TheMenu></TheMenu>
            <ion-vue-router id="main-content"/>
        </ion-app>
    </div>
</template>

<script>
    import CitiesJson from '@/ressources/city.list.min.json'
    import TheMenu from '@/components/TheMenu.vue'

    export default {
        name: 'App',
        components: {
            TheMenu
        },
        data() {
            return {}
        },
        created() {
            this.storeVueX('changeCities', JSON.parse(JSON.stringify(CitiesJson)))
        },
        mounted() {
            if (localStorage.getItem('favorites')) this.storeVueX('changeFavorites', JSON.parse(localStorage.getItem('favorites')))
            if (localStorage.getItem('lang')) this.storeVueX('changeLang', JSON.parse(localStorage.getItem('lang')))
        },
        watch: {
            getCurrentSearch(val) {
                this.storeLocal('currentSearch', val)
            },
            getFavorites(val, old) {
                this.storeLocal('favorites', val)
            },
            getCurrentLocation(val) {
                this.storeLocal('currentLocation', val)
            },
            getLang(val) {
                this.storeLocal('lang', val)
            }
        },
        computed: {
            getCurrentSearch() {
                return this.$store.state.currentSearch
            },
            getFavorites() {
                return this.$store.state.favorites
            },
            getCurrentLocation() {
                return this.$store.state.currentLocation
            },
            getLang() {
                return this.$store.state.lang
            }
        },
        methods: {
            storeLocal: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            storeVueX: function (name, data) {
                this.$store.commit(name, data)
            },
        }
    }
</script>

<style lang="scss">
    #backgroundImg {
        background-color: #000013;
    }
</style>
