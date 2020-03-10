<template>
    <ion-menu side="start" content-id="main-content" ref="menu" type="push">
        <ion-header>
            <ion-toolbar translucent>
                <ion-title color="light">Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content scroll-y="false">
            <ion-list class="menuList">
                <ion-item color="transparent">
                    <ion-icon name="mail" slot="start"></ion-icon>
                    <ion-label color="light">Inbox</ion-label>
                </ion-item>
                <ion-item color="transparent">
                    <ion-icon name="paper-plane" slot="start"></ion-icon>
                    <ion-label color="light">Outbox</ion-label>
                </ion-item>
                <ion-item color="transparent">
                    <ion-icon name="heart" slot="start"></ion-icon>
                    <ion-label color="light">Favorites</ion-label>
                </ion-item>
                <ion-item color="transparent">
                    <ion-icon name="archive" slot="start"></ion-icon>
                    <ion-label color="light">Archived</ion-label>
                </ion-item>
                <ion-item color="transparent">
                    <ion-icon name="trash" slot="start"></ion-icon>
                    <ion-label color="light">Trash</ion-label>
                </ion-item>
                <ion-item color="transparent">
                    <ion-icon name="warning" slot="start"></ion-icon>
                    <ion-label color="light">Spam</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
    export default {
        name: 'TheMenu',
        data() {
            return {}
        },
        created() {},
        mounted() {
            this.$bus.$on('openMenu', () => {
                console.log('open menu')
                this.$refs.menu.open()
            })
        },
        watch: {},
        computed: {},
        methods: {}
    }
</script>

<style lang="scss">
    ion-menu {
        z-index: 10;
        --background: #141414;
    }
    .menuList {
        height: 100%;
        background-color: #282828;
    }
</style>
