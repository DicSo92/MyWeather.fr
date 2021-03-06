<template>
    <div class="ion-page" v-if="this.renderComponent">
        <ion-header>
            <ion-toolbar class="toolbar">
                <ion-buttons slot="start">
                    <ion-button @click="openMenu">
                        <ion-icon slot="icon-only" name="settings" color="light"></ion-icon>
                    </ion-button>
                    <ion-button @click="locateMe" v-show="!this.currentLocation" class="ion-text-center">
                        <ion-icon slot="icon-only" name="navigate" color="light"></ion-icon>
                    </ion-button>
                    <ion-button @click="openChangeLang" class="ion-text-center">
                        <img class="translateIcon" src="@/assets/translateIcon.png"/>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="primary">
                    <ion-button @click="openList">
                        <ion-icon slot="icon-only" name="list" color="light"></ion-icon>
                    </ion-button>
                    <ion-button @click="openSearch">
                        <ion-icon slot="icon-only" name="search" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title ref="headerTitle">WeatherApp</ion-title>
            </ion-toolbar>
        </ion-header>

        <TheNoDataPage v-if="!this.getCurrentLocation && !this.getFavorites.length && !this.getCurrentSearch"></TheNoDataPage>

        <ion-content fullscreen class="ion-padding" scroll-y="false" v-else>
            <ion-slides id="slidesPagesFav" pager="true" :options="this.slideOpts"
                        v-bind:key="_.random(0, 10000)"
                        ref="slide"
                        @ionSlideDidChange="slideChanged">

                <HomeSlide v-if="this.currentSearch"
                           v-bind:key="this.currentSearch.infos.id"
                           :city="this.currentSearch">
                </HomeSlide>

                <HomeSlide v-if="this.currentLocation"
                           v-bind:key="this.currentLocation.infos.id"
                           :city="this.currentLocation">
                </HomeSlide>

                <HomeSlide v-for="(favoriteCity, index) in this.getFavorites"
                           v-bind:key="index"
                           :city="favoriteCity">
                </HomeSlide>

            </ion-slides>
        </ion-content>
    </div>
</template>

<script>
    import TheModalSearch from '@/components/TheModalSearch.vue'
    import TheModalList from '@/components/TheModalList.vue'

    import HomeSlide from '@/components/HomeSlide.vue'
    import TheNoDataPage from '@/components/TheNoDataPage.vue'
    import axios from 'axios'

    export default {
        name: 'Home',
        components: {
            HomeSlide,
            TheNoDataPage
        },
        data() {
            return {
                slideOpts: {
                    initialSlide: 1,
                    speed: 400,
                    pager: true
                },
                currentIndex: 0,
                currentSlideData: null,

                toastGeoLocStatus: '',

                currentGeolocation: null,
                currentLocation: null,
                currentSearch: null,

                renderComponent: true
            }
        },
        created() {
            this.getLocation()
            this.currentSearch = this.getCurrentSearch ? this.getCurrentSearch : null
        },
        mounted() {
            this.$moment.locale(this.getLang)
            this.$root.$i18n.locale = this.getLang

            this.$bus.$on('openSearch', () => {
                this.openSearch()
            })
            this.$bus.$on('openList', () => {
                this.openList()
            })
            this.$bus.$on('locateMe', () => {
                this.locateMe()
            })
            this.$bus.$on('chooseCity', (city) => {
                this.currentSearch = {infos: city, forecast: null}
            })
            this.$bus.$on('changeCurrentIndex', (index) => {
                this.currentIndex = index
            })
            this.$bus.$on('slideTo', (index) => {
                this.$refs.slide.slideTo(index)
            })
            this.$bus.$on('removeFromFavorites', (city) => {
                if (this.currentSearch) {
                    this.changeHeaderName(this.currentSearch.infos.name)
                } else if (!this.currentLocation && this.getFavorites) {
                    this.changeHeaderName(this.getFavorites[0].infos.name)
                }
                if (!this.currentLocation && !this.getFavorites && !this.currentSearch) this.changeHeaderName('Weather App')
            })
        },
        watch: {
            currentSearch (search) {
                this.$store.commit('changeCurrentSearch', {infos: search, forecast: null})
                this.changeHeaderName(search.infos.name)
            },
            getLang (val) {
                this.$moment.locale(val)
                this.forceRerender()
            }
        },
        computed: {
            getCurrentSearch () {
                return this.$store.state.currentSearch
            },
            getFavorites () {
                return this.$store.state.favorites
            },
            getCurrentLocation () {
                return this.$store.state.currentLocation
            },
            getLang () {
                return this.$store.state.lang
            }
        },
        methods: {
            openMenu () {
                this.$bus.$emit('openMenu')
            },
            openChangeLang () {
                this.$bus.$emit('openChangeLang')
            },
            changeHeaderName (text) {
                this.$refs.headerTitle.innerHTML = text
            },
            openSearch() {
                return this.$ionic.modalController
                    .create({
                        component: TheModalSearch,
                    }).then(m => {
                        m.present()
                    })
            },
            openList() {
                return this.$ionic.modalController
                    .create({
                        component: TheModalList,
                        cssClass: "my-modal-list",
                    }).then(m => {
                        m.present()
                    })
            },
            async slideChanged() {
                console.log('slide change')
                this.$refs.slide.getActiveIndex().then(index => {
                    this.currentIndex = index

                    let arrayCities = []
                    if (this.currentSearch) arrayCities.push(this.currentSearch)
                    if (this.currentLocation) arrayCities.push(this.currentLocation)
                    if (this.getFavorites) arrayCities.push(...this.getFavorites)
                    this.currentSlideData = arrayCities[index]

                    this.$store.commit('changeCurrentSlideData', this.currentSlideData)

                    this.changeHeaderName(this.currentSlideData.infos.name)
                })
            },
            async getLocation () {
                if(!("geolocation" in navigator)) {
                    this.showToast('Geolocation is not available on your device')
                    return
                }
                navigator.geolocation.getCurrentPosition(pos => {
                    this.showToast('Geolocation Authorized')
                    console.log(pos)
                    this.currentGeolocation = pos
                    this.getCurrentPositionData(pos)
                }, err => {
                    this.showToast(err.message)
                    this.$store.commit('changeCurrentLocation', null)
                })
            },
            getCurrentPositionData (pos) {
                let nowUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER + '&lang=' + this.getLang
                let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER + '&lang=' + this.getLang

                axios.get(nowUrl)
                    .then(currentWeather => {
                        this.changeHeaderName(currentWeather.data.name) // Change Header Name
                        axios.get(forecastUrl)
                            .then(forecast => {
                                this.currentLocation = {infos: currentWeather.data, forecast: forecast.data}
                                this.$store.commit('changeCurrentLocation', {infos: currentWeather.data, forecast: forecast.data})
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            async showToast (toastGeoLocStatus) {
                const toast = await this.$ionic.toastController.create({
                    message: toastGeoLocStatus,
                    showCloseButton: false,
                })
                await toast.present();
                setTimeout(() => {
                    toast.dismiss();
                }, 2000)
            },
            async locateMe() {
                try {
                    await this.getLocation
                } catch(e) {
                    console.log(e.message);
                }
            },
            forceRerender() {
                this.renderComponent = false;
                this.$nextTick(() => {
                    this.renderComponent = true;
                })
            }

        },
    }
</script>

<style lang="scss">
    #slidesPagesFav {
        height: 100%;
        color: white;
        --bullet-background: white;
        --bullet-background-active: white;
    }
    .translateIcon {
        width: 25px;
        height: auto;
    }
    .toolbar {
        border-bottom: 1px gray solid;
        color: white;
    }

    .swiper-slide {
        display: block;
    }

    .bg-gray {
        background-color: gray;
        border: solid black 1px;
    }
    .list-ios {
        margin-bottom: 0 !important;
    }
</style>
