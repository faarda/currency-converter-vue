<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "App",
  methods: {
    ...mapActions(['fetchBaseEurRates'])
  },
  async created() {
    try {
      await this.fetchBaseEurRates();
    } catch (error) {
      console.log('something went wrong')
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/styles/index";
</style>
