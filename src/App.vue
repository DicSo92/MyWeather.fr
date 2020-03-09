<template>
    <div id="app">
        <ion-app id="backgroundImg">
            <ion-vue-router/>
        </ion-app>
    </div>
</template>

<script>
    import CitiesJson from '@/ressources/city.list.min.json'

    export default {
        name: 'modal',
        data() {
            return {}
        },
        created() {
            this.storeVueX('changeCities', JSON.parse(JSON.stringify(CitiesJson)))
        },
        mounted() {
            if (localStorage.getItem('favorites')) this.storeVueX('changeFavorites', JSON.parse(localStorage.getItem('favorites')))
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
            }
        },
        methods: {
            storeLocal: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            storeVueX: function (name, data) {
                this.$store.commit(name, data)
            },
            forceRerender() {
                this.renderComponent = false;
                this.$nextTick(() => {
                    this.renderComponent = true;
                })
            }
        }
    }
</script>

<style lang="scss">
    #backgroundImg {
        background-color: #000013;
    }
</style>
