<template>
    <div id="theModalList" css-class="my-modal-list">
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start" v-if="this.favorites.length > 0">
                    <ion-button @click="toggleReorder" color="light">Toggle</ion-button>
                </ion-buttons>
                <ion-title color="light">Favorites List</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" fullscreen>

            <ion-item v-if="this.getCurrentLocation"
                      color="transparent" class="favoriteItem"
                      @click="openCurrentLocation">
                <ion-text color="light">
                    <h6 class="favoriteTime">
                        <ion-icon slot="icon-only" name="navigate" color="light"></ion-icon>
                        <!--                            {{(favorite.infos.dt + (favorite.infos.timezone - 3600))*1000 | moment("LT")}}-->
                        {{(this.getCurrentLocation.infos.dt + (this.getCurrentLocation.infos.timezone - 3600))*1000 | moment("LT")}}
                    </h6>
                    <h1 class="favoriteName">{{this.getCurrentLocation.infos.name}}</h1>
                </ion-text>
                <ion-text slot="end" color="light" class="ion-padding-vertical">
                    <i class="weatherIcon wi"
                       :class="'wi-owm-day-' + this.getCurrentLocation.infos.weather[0].id"></i>
                </ion-text>
                <ion-reorder slot="end">
                    <ion-icon name="swap" size="large" class="reorderIcon"></ion-icon>
                </ion-reorder>
            </ion-item>

            <div v-if="this.getCurrentLocation" class="delimiter ion-margin-vertical"></div>

            <ion-reorder-group @ionItemReorder="doReorder($event)" disabled="false"
                               class="groupList" ref="reorderGroup"
                               v-if="this.favorites.length > 0">
                <ion-item v-for="(favorite, index) in this.favorites"
                          color="transparent" class="favoriteItem"
                          @click="openFavorite(index)">
                    <ion-text color="light">
                        <h6 class="favoriteTime">
<!--                            {{(favorite.infos.dt + (favorite.infos.timezone - 3600))*1000 | moment("LT")}}-->
                            {{(favorite.infos.dt + (favorite.infos.timezone - 3600))*1000 | moment("LT")}}
                        </h6>
                        <h1 class="favoriteName">{{favorite.infos.name}}</h1>
                    </ion-text>
                    <ion-text slot="end" color="light" class="ion-padding-vertical">
                        <i class="weatherIcon wi"
                           :class="'wi-owm-day-' + favorite.infos.weather[0].id"></i>
                    </ion-text>
                    <ion-reorder slot="end">
                        <ion-icon name="swap" size="large" class="reorderIcon"></ion-icon>
                    </ion-reorder>
                </ion-item>
            </ion-reorder-group>

            <ion-item color="transparent" class="favoriteItem" v-else>
                <ion-text color="light">
                    <h5 class="ion-margin-vertical">You still don't have any favorites</h5>
                </ion-text>
                <ion-icon slot="end" name="add" size="large" color="light" @click="addFavorites()"></ion-icon>
            </ion-item>

        </ion-content>
    </div>
</template>

<script>
    import store from '../store';
    export default {
        name: 'TheModalList',
        components: {
        },
        data() {
            return {
                favorites: []
            }
        },
        created() {
        },
        mounted() {
            this.favorites = store.state.favorites

            this.$bus.$on('dismissModalList', () => {
                this.dismissModal()
            })

            console.log('openModalList test1')
        },
        watch: {
        },
        computed: {
            getFavorites() {
                return store.state.favorites
            },
            getCurrentLocation() {
                return store.state.currentLocation
            },
            getCurrentSearch() {
                return store.state.currentSearch
            },
        },
        methods: {
            openFavorite (index) {
                let favoriteIndex = index
                if (this.getCurrentSearch)  favoriteIndex += 1
                if (this.getCurrentLocation) favoriteIndex += 1
                this.$ionic.modalController.dismiss()
                this.$bus.$emit('slideTo', favoriteIndex)
            },
            openCurrentLocation () {
                let currentLocationIndex = 0
                if (this.getCurrentSearch)  currentLocationIndex += 1
                this.$ionic.modalController.dismiss()
                this.$bus.$emit('slideTo', currentLocationIndex)
            },
            dismissModal() {
                this.$ionic.modalController.dismiss()
            },
            doReorder(event) {
                console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
                this.favorites = event.detail.complete(this.favorites);
                // event.detail.complete();
            },
            toggleReorder() {
                const reorderGroup = this.$refs.reorderGroup
                reorderGroup.disabled = !reorderGroup.disabled;
            },
            addFavorites () {
                this.dismissModal()
                this.$bus.$emit('openSearch')
            }
        }
    }
</script>

<style scoped lang="scss">
    .favoriteItem {
        border-bottom: 1px solid dimgray;
        border-top: 1px solid dimgray;
        margin-left: -16px;
        margin-right: -16px;

        .favoriteTime {
            display: flex;
            align-items: center;
            color: grey;
            ion-icon {
                font-size: 20px;
            }
        }
        .favoriteName {
            margin-top: 0;
        }
        .weatherIcon {
            margin-top: 5px;
            font-size: 40px;
        }
        .reorderIcon {
            color: grey;
            transform: rotate(90deg);
        }
    }
    .delimiter {
        background-color: grey;
        opacity: 0.2;
        height: 1px;
        margin-left: -16px;
        margin-right: -16px;
    }
    #theModalList {
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
