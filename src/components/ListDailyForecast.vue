<template>
    <ion-content overflow-scroll="false" color="transparent" class="listDays">
        <ion-list id="searchList">
            <ion-item color="transparent" class="containerItem">
                <ion-label color="light">Monday</ion-label>
            </ion-item>
            <ion-item color="transparent" class="containerItem">
                <ion-label color="light">Tuesday</ion-label>
            </ion-item>
            <ion-item color="transparent" class="containerItem">
                <ion-label color="light">Wednesday</ion-label>
            </ion-item>
            <ion-item color="transparent" class="containerItem">
                <ion-label color="light">Thursday</ion-label>
            </ion-item>
            <ion-item color="transparent" class="containerItem">
                <ion-label color="light">Friday</ion-label>
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<script>
    // import axios from 'axios'
    export default {
        name: 'Home',
        components: {
        },
        props: {
            city: Object,
        },
        data() {
            return {
            }
        },
        mounted() {

        },
        watch: {},
        computed: {
        },
        methods: {
        },
    }
</script>

<style lang="scss">
    .listDays  {
        height: 25vh;
        overflow-y: scroll;
        display: block;
        border-top: 1px solid #acacac;
    }
    #searchList {
        background-color: transparent;
        .containerItem {
            border-bottom: 1px solid white;
        }
    }
</style>
