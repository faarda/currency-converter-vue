<template>
  <div class="converter">
    <value-selector @open-picker="togglePicker($event)" />
    <currency-picker :converter="converter" :picking="picking" :pickerOpen="currencyPickerOpen" @close-picker="togglePicker()" />
  </div>
</template>

<script>
  import ValueSelector from '@/components/ValueSelector.vue'
  import CurrencyPicker from '@/components/CurrencyPicker.vue';

  export default {
    name: "Converter",
    data: function() {
      return {
        converter: {
          from: {
            currency: "USD",
            value: 0.00,
            formattedValue: "0.00"
          },
          to: {
            currency: "GBP",
            value: 0.00,
            formattedValue: "0.00"
          }
        },
        picking: "to",
        currencyPickerOpen: false
      }
    },
    components: {
      ValueSelector,
      CurrencyPicker
    },
    methods: {
      togglePicker(e = null){
        if(e){
          this.picking = e;
        }
        this.currencyPickerOpen = !this.currencyPickerOpen;
      }
    }
  };
</script>
