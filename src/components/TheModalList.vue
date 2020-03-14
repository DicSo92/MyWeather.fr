<template>
    <div id="theModalList" css-class="my-modal-list">
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
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
            <ion-reorder-group @ionItemReorder="doReorder($event)" disabled="false" class="groupList" ref="reorderGroup">

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
            }
        }
    }
</script>

<style scoped lang="scss">
    .favoriteItem {
        border-bottom: 1px solid dimgray;
        border-top: 1px solid dimgray;

        .favoriteTime {
            color: grey;
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
    .groupList {
        ion-item {
            margin-left: -16px;
            margin-right: -16px;
        }
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
