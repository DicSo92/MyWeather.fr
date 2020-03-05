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
                <ion-title>{{!this.search ? 'Paris' : this.search.name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding" scroll-y="false">
            <ion-slides id="slidesPagesFav">

                <ion-slide v-for="(citySlide, index) in this.filterSlide">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                --{{citySlide.name}}--
                                <ion-buttons>
                                    <ion-button @click="addToFavorite(citySlide)">
                                        <ion-icon slot="icon-only" name="star" color="light"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4" class="bg-gray">
                                col 4
                            </ion-col>
                            <ion-col size="4" class="bg-gray">
                                col 4
                            </ion-col>
                            <ion-col size="4" class="bg-gray">
                                col 4
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-slide>

                <!--                <ion-slide>-->
                <!--                    <img src="../assets/logo.png"/>-->
                <!--                    <h2>Ready to Play?</h2>-->
                <!--                    <ion-button fill="clear">Continue-->
                <!--                        <ion-icon slot="end" name="arrow-forward"></ion-icon>-->
                <!--                    </ion-button>-->
                <!--                </ion-slide>-->

            </ion-slides>
        </ion-content>
    </div>
</template>

<script>
    import theModalSearch from '@/components/theModalSearch.vue'

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                slideOpts: {
                    initialSlide: 1,
                    speed: 400
                },
                search: null,
            }
        },
        mounted() {
            this.$bus.$on('searchCity', (city) => {
                this.temporaryStore(city)
            })
        },
        computed: {
            filterSlide() {
                if (!localStorage.getItem('favorites')) {
                    if (this.search) {
                        return [this.search, {name: 'Current Location', id: 123456}, {name: 'test', id: 4578899}]
                    } else {
                        return [{name: 'Current Location', id: 123456}, {name: 'test', id: 4578899}]
                    }
                } else {
                    return localStorage.getItem('favorites')
                }
            }
        },
        methods: {
            openSearch() {
                return this.$ionic.modalController
                    .create({
                        component: theModalSearch,
                    })
                    .then(m => m.present())
            },
            temporaryStore(city) {
                this.search = city
            },
            addToFavorite(city) {
                const current = Array(city)
                if (localStorage.getItem('favorites')) {
                    current.push(localStorage.getItem('favorites').join())
                }
                localStorage.setItem('favorites', current)
            }
        },
    }
</script>

<style lang="scss">
    #slidesPagesFav {
        height: 100%;
        color: white;
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
