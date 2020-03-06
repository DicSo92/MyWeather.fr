<template>
    <div id="theModalSearch">
        <ion-header translucent>
            <ion-toolbar>
                <ion-title color="light">Search City</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar animated id="searchBar"
                               v-bind:value="search"
                               @input="search = $event.target.value">
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" fullscreen>
            <ion-spinner color="light"></ion-spinner>
            <ion-list id="searchList">

                <ion-item color="transparent" class="containerItem"
                          v-for="(city, index) in searchCities"
                          v-bind:key="city.id"
                          v-on:click="chooseCity(city)">
                    <ion-label color="light">{{city.name}}</ion-label>
                    <country-flag slot="end" v-if="city.country !== ''"
                                  :country="city.country" size='normal'/>
                </ion-item>

            </ion-list>
        </ion-content>
    </div>
</template>

<script>
    import CountryFlag from 'vue-country-flag'
    import store from '../store';
    export default {
        name: 'modal',
        components: {
            CountryFlag
        },
        data() {
            return {
                search: '',
                searchCities: []
            }
        },
        created() {
            this.debouncedGetSearch = _.debounce(this.getSearch, 500)
        },
        mounted() {
        },
        watch: {
            search: function (newSearch, oldSearch) {
                console.log("J'attends que vous arrêtiez de taper...")
                this.debouncedGetSearch()
            }
        },
        computed: {},
        methods: {
            getSearch () {
                if (this.search.length > 0 ) {
                    this.searchCities = store.state.cities.filter(city => {
                        return city.name.toLowerCase().includes(this.search.toLowerCase())
                    }).slice(0, 20)
                } else {
                    this.searchCities = []
                }
            },
            chooseCity(city) {
                store.commit('changeCurrentSearch', city)
                this.dismissModal()
            },
            dismissModal() {
                this.$bus.$emit('dismissModal')
                this.$ionic.modalController.dismiss()
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #theModalSearch {

    }
    #searchBar {
        /*--background: #990000;*/
        --color: white;
        --icon-color: white;
        /*--box-shadow: 0px 0px 0px 13px #ffffff;*/
        --placeholder-color: white;
        padding-bottom: 0;
        border-bottom: gray 1px solid;
    }
    #searchList {
        background-color: transparent;
        .containerItem {
            border-bottom: 1px solid white
        }
    }

</style>
