<template>
  <div :class="`converter__currency-picker ${pickerOpen ? 'open' : ''}`">
    <button class="converter__currency-picker__close-btn" @click="$emit('close-picker')">
      <svg width="35%" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 1L13 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="converter__main__top">
      <div class="converter__main__value">
        <div class="converter__main__value__currency">
          <h3 class="converter__main__value__currency__sign">{{selectedCurrency.symbol}}</h3>
          <span class="currency__main__value__currency__name">{{selectedCurrency.name}}</span>
        </div>
        <h1 class="converter__main__value__value">
          {{selectedValue}}
        </h1>
      </div>
    </div>
    <ul class="converter__currency-picker__list">
      <li :class="`converter__currency-picker__list-item ${currency.code === selectedCurrency.code ? 'selected' : ''}`" v-for="currency in currencies" :key="currency.code">
        <div class="converter__currency-picker__list-item__details">
          <h2 class="converter__currency-picker__list-item__details__sign">{{currency.symbol}}</h2>
          <span class="converter__currency-picker__list-item__details__name">{{currency.name}}</span>
        </div>
        <svg width="18" viewBox="0 0 18 13" fill="none" class="converter__currency-picker__list-item__check">
          <path d="M17 1L6 12L1 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrencyFromCode } from '../utils/functions'

export default {
  name: "CurrencyPicker",
  props: {
    converter: {
      required: true,
      type: Object
    },
    picking: {
      required: true,
      type: String
    },
    pickerOpen: Boolean
  },
  data: function() {
    return {
      selectedCurrency: {},
      selectedValue: ""
    }
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies
    })
  },
  watch: {
    picking: {
      handler: function(val) {
        const converterData = this.converter[val];
        this.selectedCurrency = getCurrencyFromCode(this.currencies, converterData.currency);
        this.selectedValue = converterData.formattedValue
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>