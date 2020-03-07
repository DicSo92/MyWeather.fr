<template>
    <ion-item color="transparent" class="containerItem" v-bind:key="city.id" v-on:click="chooseCity(city)">
        <ion-label color="light">{{city.name}}</ion-label>
        <ion-button color="transparent" v-if="isFavorite" @click.stop="removeFromFavorites(city)">
            <ion-icon slot="icon-only"
                      name="star"
                      color="warning">
            </ion-icon>
        </ion-button>
        <country-flag slot="end" v-if="city.country !== ''"
                      :country="city.country" size='normal'/>
    </ion-item>
</template>

<script>
    import CountryFlag from 'vue-country-flag'
    import store from '../store';

    export default {
        name: 'modal',
        props: {
            city: Object,
        },
        components: {
            CountryFlag
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        computed: {
            getFavorites() {
                return store.state.favorites
            },
            isFavorite() {
                return this.getFavorites.findIndex(favorite => favorite.id === this.city.id) !== -1;
            },
        },
        methods: {
            removeFromFavorites(city) {
                store.commit('removeFavorite', city.id)
            },
            chooseCity(city) {
                store.commit('changeCurrentSearch', city)
                this.$bus.$emit('dismissTheModal')
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
