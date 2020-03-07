<template>
    <div class="ion-page" v-if="this.renderFirstComponent">
        <ion-header >
            <ion-toolbar class="toolbar">
                <ion-buttons slot="start">
                    <ion-button>
                        <ion-icon slot="icon-only" name="settings" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="primary">
                    <ion-button @click="openSearch">
                        <ion-icon slot="icon-only" name="search" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{this.filterHeaderText}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding" scroll-y="false" v-if="!this.getCurrentLocation && !this.getFavorites.length && !this.getCurrentSearch">
            <ion-text color="light" class="ion-text-center">
                <h4>Do a search !</h4>
            </ion-text>
            <ion-button @click="openSearch" class="ion-text-center">
                <ion-icon slot="icon-only" name="search" color="light"></ion-icon>
            </ion-button>
            <ion-text color="light" class="ion-text-center">
                <h4>OR</h4>
                <h4>Activate Geolocation</h4>
            </ion-text>
            <ion-button @click="locateMe" class="ion-text-center">
                <ion-icon slot="icon-only" name="compass" color="light"></ion-icon>
            </ion-button>
        </ion-content>
        <ion-content fullscreen class="ion-padding" scroll-y="false" v-else>
            <ion-slides id="slidesPagesFav" pager="true" :options="this.slideOpts"
                        v-if="this.renderComponent && this.filterSlide"
                        v-bind:key="this.filterSlide.length"
                        ref="slide" @ionSlideDidChange="slideChanged">

                <HomeSlide v-for="(citySlide, index) in this.filterSlide"
                           v-bind:key="index"
                           :city="citySlide">
                </HomeSlide>

            </ion-slides>
        </ion-content>
    </div>
</template>

<script>
    import TheModalSearch from '@/components/TheModalSearch.vue'
    import HomeSlide from '@/components/HomeSlide.vue'
    import axios from 'axios'

    export default {
        name: 'Home',
        components: {
            HomeSlide
        },
        data() {
            return {
                slideOpts: {
                    initialSlide: 1,
                    speed: 400,
                    pager: true
                },
                renderComponent: true,
                renderFirstComponent: true,
                currentIndex: 0,

                toastGeoLocStatus: '',
                currentPosition: null
            }
        },
        created() {
            this.getLocation()
        },
        mounted() {
            this.$bus.$on('dismissModal', () => {
                this.setRenderComponent()
            })
            this.$bus.$on('changeCurrentIndex', (index) => {
                this.currentIndex = index
            })
            this.$bus.$on('slideTo', (index) => {
                this.$refs.slide.slideTo(index)
            })
        },
        watch: {
            getCurrentSearch () {
                this.setRenderComponent()
            },
        },
        computed: {
            filterSlide() {
                console.log(this.getFavorites)
                if (this.getCurrentSearch && this.getFavorites) {
                    if (this.getCurrentLocation){
                        return [this.getCurrentSearch, this.getCurrentLocation, ...this.getFavorites]
                    } else {
                        return [this.getCurrentSearch, ...this.getFavorites]
                    }
                } else if (this.getFavorites && !this.getCurrentSearch) {
                     if (this.getCurrentLocation){
                        return [this.getCurrentLocation, ...this.getFavorites]
                    } else {
                        return [...this.getFavorites]
                    }
                } else if (this.getCurrentLocation){
                    return [this.getCurrentLocation]
                } else {
                    return null
                }
            },
            currentSlideData() {
                return this.filterSlide[this.currentIndex]
            },
            getCurrentSearch () {
                return this.$store.state.currentSearch
            },
            getFavorites () {
                return this.$store.state.favorites
            },
            getCurrentLocation () {
                return this.$store.state.currentLocation
            },
            filterHeaderText () {
                return !this.getCurrentLocation && !this.getFavorites.length && !this.getCurrentSearch ? 'no geolocation' : this.currentSlideData.name
            }
        },
        methods: {
            openSearch() {
                return this.$ionic.modalController
                    .create({
                        component: TheModalSearch,
                    })
                    .then(m => {
                        m.present()
                        this.renderComponent = false
                    })
            },
            slideChanged(e) {
                console.log('slide change')
                e.target.getActiveIndex().then(index => {
                    this.currentIndex = index;
                })
            },
            setRenderComponent () {
                this.renderComponent = true
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
            async getLocation () {
                if(!("geolocation" in navigator)) {
                    this.showToast('Geolocation is not available on your device')
                    return
                }
                navigator.geolocation.getCurrentPosition(pos => {
                    this.showToast('Geolocation Authorized')
                    console.log(pos)
                    this.currentPosition = pos
                    this.getCurrentPositionData(pos)
                }, err => {
                    this.showToast(err.message)
                    this.$store.commit('changeCurrentLocation', null)
                })
            },
            async locateMe() {
                try {
                    await this.getLocation
                } catch(e) {
                    console.log(e.message);
                }
            },
            getCurrentPositionData (pos) {
                let nowUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER

                let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER
                console.log(nowUrl)
                axios.get(nowUrl)
                    .then(response => {
                        console.log('curentLocation currentWeather axios')

                        this.$store.commit('changeCurrentLocation', response.data)
                        this.renderFirstComponent = true
                    })
                    .catch(error => {
                        console.log(error)
                    });

                axios.get(forecastUrl)
                    .then(response => {
                        console.log('curentLocation forecast axios')
                    })
                    .catch(error => {
                        console.log(error)
                    });
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

    .bg-blue-dark {
        /*background-color: #000148;*/
    }
</style>
