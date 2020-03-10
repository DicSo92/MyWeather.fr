<template>
    <ion-content fullscreen class="ion-padding" scroll-y="false">
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
</template>

<script>
    export default {
        name: 'modal',
        components: {
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        computed: {},
        methods: {
            openSearch() {
                this.$bus.$emit('openSearch')
            },
            locateMe () {
                this.$bus.$emit('locateMe')
            }
        }
    }
</script>

<style lang="scss">

</style>
