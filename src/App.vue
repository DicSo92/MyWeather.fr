<template>
  <div id="app">
    <ion-app  id="backgroundImg">
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
  import CitiesJson from '@/ressources/city.list.min.json'
  export default {
    name: 'modal',
    // props: {bookProps: {type: Object}},
    data() {
      return {
      }
    },
    beforeCreate() {},
    created() {
      this.storeXCities()
    },
    mounted() {},
    watch: {},
    computed: {},
    methods: {
      storeXCities: function () {
        this.$store.commit('changeCities', JSON.parse(JSON.stringify(CitiesJson)))
      }
    }
  }
</script>

<style lang="scss">
  #backgroundImg {
    background-color: #000013;
  }
</style>
