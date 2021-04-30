<template>
  <div class="converter__main">
    <div class="converter__main__top">
      <div class="converter__main__value" @click="openCurrencyPicker('from')">
        <div class="converter__main__value__currency">
          <h3 class="converter__main__value__currency__sign">$</h3>
          <span class="currency__main__value__currency__name">US DOLLAR</span>
        </div>
        <h1 class="converter__main__value__value">
          584.60
        </h1>
      </div>
    </div>
    <div class="converter__main__bottom">
      <div class="converter__main__value" @click="openCurrencyPicker('to')">
        <div class="converter__main__value__currency">
          <h3 class="converter__main__value__currency__sign">£</h3>
          <span class="currency__main__value__currency__name">BRITISH POUND</span>
        </div>
        <h1 class="converter__main__value__value">
          453.09
        </h1>
      </div>
      <keypad />
    </div>
  </div>
</template>

<script>
import Keypad from './Keypad.vue'
  export default {
    name: "ValueSelector",
    components: { Keypad },
    methods: {
      openCurrencyPicker(place){
        this.$emit('open-picker', place)
      }
    }
  }
</script>

<style>

</style>