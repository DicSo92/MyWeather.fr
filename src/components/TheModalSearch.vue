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
            <div class="ion-text-center" v-if="this.loading">
                <ion-spinner color="light"></ion-spinner>
            </div>
            <ion-list id="searchList">

                <ModalSearchItem v-for="(city, index) in searchCities"
                          v-bind:key="city.id"
                          :city="city">
                </ModalSearchItem>

            </ion-list>
        </ion-content>
    </div>
</template>

<script>
    import ModalSearchItem from '@/components/ModalSearchItem.vue'
    import CountryFlag from 'vue-country-flag'
    import store from '../store';
    export default {
        name: 'modal',
        components: {
            CountryFlag,
            ModalSearchItem
        },
        data() {
            return {
                search: '',
                searchCities: [],
                loading: false
            }
        },
        created() {
            this.debouncedGetSearch = _.debounce(this.getSearch, 500)
        },
        mounted() {
            this.$bus.$on('dismissTheModal', () => {
                this.dismissModal()
            })
        },
        watch: {
            search: function (newSearch, oldSearch) {
                console.log("J'attends que vous arrêtiez de taper...")
                this.loading = true
                this.debouncedGetSearch()
            }
        },
        computed: {
            getFavorites() {
                return store.state.favorites
            },
            isFavorite() {
                return this.getFavorites.findIndex(favorite => favorite.infos.id === this.city.id) !== -1;
            },
        },
        methods: {
            getSearch () {
                if (this.search.length > 0 ) {
                    this.searchCities = store.state.cities.filter(city => {
                        return city.name.toLowerCase().includes(this.search.toLowerCase())
                    }).slice(0, 20)
                } else {
                    this.searchCities = []
                }
                this.loading = false
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
