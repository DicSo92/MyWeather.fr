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
                <ion-title>{{!this.getCurrentSearch ? 'Paris' : this.getCurrentSearch.name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding" scroll-y="false">
            <ion-slides id="slidesPagesFav" pager="true" :options="this.slideOpts"
                        v-if="this.renderComponent"
                        v-bind:key="this.filterSlide.length">

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
                renderComponent: true
            }
        },
        mounted() {
            this.$bus.$on('dismissModal', () => {
                this.setRenderComponent()
            })
            this.$bus.$on('removeFromFavorites', () => {
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
                console.log('|| getFavorites ||')
                console.log(this.getFavorites)
                if (this.getCurrentSearch && this.getFavorites) {
                    return [this.getCurrentSearch, this.getCurrentLocation, ...this.getFavorites]
                } else if (this.getFavorites && !this.getCurrentSearch) {
                    return [this.getCurrentLocation, ...this.getFavorites]
                } else {
                    return [this.getCurrentLocation]
                }
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
            setRenderComponent () {
                this.renderComponent = true
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
