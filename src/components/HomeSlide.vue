<template>
    <ion-slide v-bind:key="city.id">
        <ion-grid>
            <ion-row>
                <ion-col>
                    --{{city.name}}--
                    <ion-buttons>
                        <ion-button v-if="isFavorite" @click="removeFromFavorites(city)">
                            <ion-icon slot="icon-only"
                                      name="star"
                                      color="warning"></ion-icon>
                        </ion-button>
                        <ion-button v-if="!isFavorite" @click="addToFavorites(city)">
                            <ion-icon slot="icon-only"
                                      name="star-outline"
                                      color="light"></ion-icon>
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
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        props: {
            city: Object,
        },
        data() {
            return {}
        },
        mounted() {
        },
        watch: {},
        computed: {
            getFavorites() {
                return this.$store.state.favorites
            },
            isFavorite() {
                return this.getFavorites.findIndex(favorite => favorite.id === this.city.id) !== -1;
            },
        },
        methods: {
            addToFavorites(city) {
                let newFavorites = [city]
                if (this.getFavorites.length > 0) {
                    newFavorites.unshift(...this.getFavorites)
                }
                this.$store.commit('changeFavorites', newFavorites)
            },
            removeFromFavorites(city) {
                this.$store.commit('removeFavorite', city.id)
                this.$bus.$emit('removeFromFavorites')
            },
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
