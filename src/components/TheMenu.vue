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
                    <ion-item color="transparent" class="ion-margin-top">
                        <ion-icon name="apps" color="light" slot="start"></ion-icon>
                        <ion-label color="light">Home</ion-label>
                    </ion-item>
                    <ion-item color="transparent" @click="openList">
                        <ion-icon name="list" color="light" slot="start"></ion-icon>
                        <ion-label color="light">Favorites</ion-label>
                    </ion-item>
                    <ion-item color="transparent" @click="openSearch">
                        <ion-icon name="search" color="light" slot="start"></ion-icon>
                        <ion-label color="light">Search</ion-label>
                    </ion-item>
                    <ion-item color="transparent">
                        <ion-label color="light" class="translate">
                            <img class="ion-margin-end" src="@/assets/translateIcon.png"/>
                            Language
                        </ion-label>
                        <ion-select value="English" id="selectLang">
                            <ion-select-option value="English">English</ion-select-option>
                            <ion-select-option value="French">French</ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-list>
                <ion-list class="menuList">
                    <ion-item color="transparent" @click="openAbout">
                        <ion-icon name="at" class="greyColor" slot="start"></ion-icon>
                        <ion-label class="greyColor">About</ion-label>
                    </ion-item>
                    <ion-item color="transparent" id="GTC" @click="openLegalMentions">
                        <ion-icon name="finger-print" class="greyColor" slot="start"></ion-icon>
                        <ion-label class="greyColor">Legal Mentions</ion-label>
                    </ion-item>
                    <ion-item color="transparent" id="GTC" class="ion-margin-bottom" @click="openGTC">
                        <ion-icon name="document" class="greyColor" slot="start"></ion-icon>
                        <ion-label class="greyColor">General Terms and Conditions</ion-label>
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
        <ion-footer id="footerMenu">
            <ion-item color="transparent" lines="none">
                <ion-text color="light">
                    <p>
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
        </ion-footer>
    </ion-menu>
</template>

<script>
    import TheModalLegalMentions from "../components/TheModalLegalMentions";
    import TheModalGTC from "../components/TheModalGTC";
    import TheModalAbout from "../components/TheModalAbout";

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
        methods: {
            openLegalMentions() {
                this.$refs.menu.close()
                return this.$ionic.modalController
                    .create({
                        component: TheModalLegalMentions,
                    }).then(m => {
                        m.present()
                    })
            },
            openGTC () {
                this.$refs.menu.close()
                return this.$ionic.modalController
                    .create({
                        component: TheModalGTC,
                    }).then(m => {
                        m.present()
                    })
            },
            openAbout () {
                this.$refs.menu.close()
                return this.$ionic.modalController
                    .create({
                        component: TheModalAbout,
                    }).then(m => {
                        m.present()
                    })
            },
            openList () {
                this.$refs.menu.close()
                this.$bus.$emit('openList')
            },
            openSearch () {
                this.$refs.menu.close()
                this.$bus.$emit('openSearch')
            }
        }
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
        #selectLang {
            color: grey;
            display: flex;
            align-items: center;
        }
        #GTC {

        }
        .greyColor {
            color: #b3b3b3;
            font-size: 16px;
        }
    }
    #footerMenu {
        border-top: 1px solid rgba(60, 60, 60, 0.8);
        background-color: #282828;
        p {
            font-size: 12px;
            a {
                color: darkgrey;
            }
        }
    }
</style>
