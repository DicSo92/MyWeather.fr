<template>
    <ion-menu side="start" content-id="main-content" ref="menu" type="push">
        <ion-header>
            <ion-toolbar translucent>
                <ion-title color="light">Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content scroll-y="false">
            <div id="containerMenuList">
                <ion-list class="menuList">
                    <ion-item color="transparent">
                        <ion-label color="light" class="translate">
                            <img class="ion-margin-end" src="@/assets/translateIcon.png"/>
                            Language
                        </ion-label>
                        <ion-select value="English" class="selectLang">
                            <ion-select-option value="English">English</ion-select-option>
                            <ion-select-option value="French">French</ion-select-option>
                        </ion-select>
                    </ion-item>
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

                <ion-item color="transparent" lines="none">
                    <ion-text color="light">
                        <p id="madeByText">
                            Made with
                            <span>
                                <ion-icon name="heart" color="danger"></ion-icon>
                            </span>
                            by
                            <a href="https://charlyluzzi.com" target="_blank">@CharlyLuzzi</a>
                        </p>
                    </ion-text>
                    <a href='https://ko-fi.com/O4O21FX86' target='_blank' slot="end">
                        <img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi5.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
                    </a>
                </ion-item>
            </div>
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

<style scoped lang="scss">
    #containerMenuList {
        height: 100%;
        background-color: #282828;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    ion-menu {
        z-index: 10;
        --background: #141414;
    }
    .menuList {
        background-color: transparent;
    }
    .translate {
        display: flex;
        align-items: center;
        img {
            margin-right: 16px;
            margin-left: 5px;
            width: 20px;
            height: auto;
        }
    }
    .selectLang {
        color: grey;
        display: flex;
        align-items: center;
    }
    #madeByText {
        font-size: 12px;

        a {
            color: darkgrey;
        }
    }
</style>
