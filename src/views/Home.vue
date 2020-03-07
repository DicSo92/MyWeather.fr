<template>
    <div class="ion-page">
        <ion-header>
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
                <ion-title>{{this.currentSlideData.name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding" scroll-y="false">
            <ion-slides id="slidesPagesFav" pager="true" :options="this.slideOpts"
                        v-if="this.renderComponent"
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
                currentIndex: 0,

                toastGeoLocStatus: '',
                currentPosition: null
            }
        },
        created() {
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
            })
        },
        mounted() {
            this.$bus.$on('dismissModal', () => {
                this.setRenderComponent()
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
                    return [this.getCurrentSearch, this.getCurrentLocation, ...this.getFavorites]
                } else if (this.getFavorites && !this.getCurrentSearch) {
                    return [this.getCurrentLocation, ...this.getFavorites]
                } else {
                    return [this.getCurrentLocation]
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
            getCurrentPositionData (pos) {
                let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + rqst + '&units=metric&APPID=' + process.env.VUE_APP_OPEN_WEATHER;
                console.log(url)
                axios.get(url)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
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
