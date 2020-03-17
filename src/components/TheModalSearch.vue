<template>
    <div id="theModalSearch">
        <ion-header translucent>
            <ion-toolbar>
                <ion-title color="light">{{ this.$ti18n.t('searchHeader') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar animated id="searchBar"
                               :placeholder="this.$ti18n.t('searchPlaceHolder')"
                               v-bind:value="search"
                               @input="search = $event.target.value">
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" fullscreen>
            <div class="ion-text-center" v-show="this.loading">
                <ion-spinner color="light"></ion-spinner>
            </div>
            <ion-list id="searchList">
                <ModalSearchItem v-for="(city, index) in searchCitieRests"
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
    import axios from 'axios'



    export default {
        name: 'TheModalSearch',
        components: {
            CountryFlag,
            ModalSearchItem,
        },
        data() {
            return {
                search: '',
                // searchCities: [],
                searchCitieRests: [],
                loading: false
            }
        },
        created() {
            // this.debouncedGetSearch = _.debounce(this.getSearch, 600)
            this.debouncedGetSearch = _.debounce(this.getSearchRest, 600)
        },
        mounted() {
            this.$bus.$on('dismissTheModal', () => {
                this.dismissModal()
            })
            console.log(this.$ti18n.locale)
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
            dismissModal() {
                this.$ionic.modalController.dismiss()
            },

            // getSearch () {
            //     if (this.search.length > 0 ) {
            //         this.searchCities = store.state.cities.filter(city => {
            //             return city.name.toLowerCase().includes(this.search.toLowerCase())
            //         }).slice(0, 5)
            //     } else {
            //         this.searchCities = []
            //     }
            //     this.loading = false
            // },


            getSearchRest () {
                if (this.search.length > 0 ) {
                    // let nowUrl = `http://localhost/RestApiPhp_Cities/?search=${this.search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ')}`
                    let nowUrl = `https://cities-api.online/?search=${this.search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ')}`
                    axios.get(nowUrl)
                        .then(search => {
                            this.searchCitieRests = search.data.searchDatas
                            this.loading = false
                        })
                        .catch(error => {
                            console.log(error)
                            this.searchCitieRests = []
                            this.loading = false
                        });
                } else {
                    this.searchCitieRests = []
                    this.loading = false
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    #theModalSearch {
        --background: transparent;
    }
    #searchBar {
        --background: transparent;
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
