<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar class="toolbar">
                <ion-buttons slot="start">
                    <ion-button @click="openMenu">
                        <ion-icon slot="icon-only" name="settings" color="light"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title ref="headerTitle">Legal Mentions</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-text color="light">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque exercitationem, facilis hic, illo illum impedit iusto labore magni molestias nesciunt omnis praesentium quae quibusdam ratione reiciendis totam! Odit, soluta.</p>
            </ion-text>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'LegalMentions',
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
            openMenu () {
                this.$bus.$emit('openMenu')
            },
        }
    }
</script>

<style lang="scss">

</style>
