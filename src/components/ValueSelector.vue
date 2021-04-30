<template>
  <div class="converter__main">
    <div class="converter__main__top">
      <div class="converter__main__value" @click="openCurrencyPicker('from')">
        <div class="converter__main__value__currency">
          <h3 class="converter__main__value__currency__sign">{{fromCurrency.symbol}}</h3>
          <span class="currency__main__value__currency__name">{{fromCurrency.name}}</span>
        </div>
        <h1 class="converter__main__value__value scaling-text" :style="{'--length': getDigitsLength(converter.from.value)}">
          {{numberWithCommas(converter.from.value)}}
        </h1>
      </div>
    </div>
    <div class="converter__main__bottom">
      <div class="converter__main__value" @click="openCurrencyPicker('to')">
        <div class="converter__main__value__currency">
          <h3 class="converter__main__value__currency__sign">{{toCurrency.symbol}}</h3>
          <span class="currency__main__value__currency__name">{{toCurrency.name}}</span>
        </div>
        <h1 class="converter__main__value__value scaling-text" :style="{'--length': getDigitsLength(converter.to.value)}">
          {{numberWithCommas(converter.to.value)}}
        </h1>
      </div>
      <keypad />
    </div>
  </div>
</template>

<script>
  import Keypad from './Keypad.vue'
  import { getCurrencyFromCode , numberWithCommas, getDigitsLength} from '../utils/functions'

  export default {
    name: "ValueSelector",
    props: {
      converter: {
        required: true,
        type: Object
      },
      currencies: {
        type: Array,
        required: true
      }
    },
    components: { Keypad },
    data(){
      return {
        fromCurrency: {},
        toCurrency: {}
      }
    },
    methods: {
      openCurrencyPicker(place){
        this.$emit('open-picker', place)
      },
      numberWithCommas,
      getDigitsLength
    },
    watch: {
      converter: {
        immediate: true,
        deep: true,
        handler(value){
          this.fromCurrency = getCurrencyFromCode(this.currencies, value.from.currency);
          this.toCurrency = getCurrencyFromCode(this.currencies, value.to.currency);
        }
      }
    }
  }
</script>

<style>

</style>