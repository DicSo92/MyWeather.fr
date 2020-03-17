<template>
    <div id="theModalLegalMentions" css-class="my-modal-list">
        <ion-header translucent>
            <ion-toolbar class="toolbar">
                <ion-title ref="headerTitle">About</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-text color="light" class="fontSmall">
                <p class="m-0 grey"><span class="bold">Author : </span><a class="light" href="https://www.charlyluzzi.com" target="_blank">www.charlyluzzi.com</a></p>
            </ion-text>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'TheModalAbout',
        components: {
        },
        data() {
            return {
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {

        },
        computed: {

        },
        methods: {
            dismissModal() {
                this.$ionic.modalController.dismiss()
            },
        }
    }
</script>

<style scoped lang="scss">
    .bold {
        color: whitesmoke;
        font-weight: bold;
    }
    .m-0 {
        margin: 0;
    }
    .light {
        color: whitesmoke;
    }
    .grey {
        color: grey;
    }
    .fontSmall {
        font-size: 14px;
    }
    .fontMedium {
        font-size: 15px;
    }
    .fontLarge {
        font-size: 20px;
    }
    .headerText {
        margin-bottom: 30px;
    }
    .titleText {
        margin-top: 28px;
        margin-bottom: 8px;
    }
</style>
