<template>
  <div class="converter">
    <value-selector @open-picker="togglePicker($event)" :converter="converter" :currencies="currencies" />
    <currency-picker :converter="converter" :picking="picking" :pickerOpen="isCurrencyPickerOpen" @close-picker="togglePicker()" :currencies="currencies" @currency-picked="switchRouteCurrency($event)" />
    <div class="converter__error" v-if="isCurrencyInvalid">
      <h6>Currency combination not supported, supported currencies are {{currenciesToCommaSeparatedList(currencies)}}</h6>
      <router-link class="converter__error__link" to="/">Go back home</router-link>
    </div>
  </div>
</template>

<script>
  import ValueSelector from '@/components/ValueSelector.vue'
  import CurrencyPicker from '@/components/CurrencyPicker.vue';
  import { mapState } from 'vuex'
  import { eventBus } from '../main'
  import { currenciesToCommaSeparatedList } from '../utils/functions'

  export default {
    name: "Converter",
    components: {
      ValueSelector,
      CurrencyPicker
    },
    data: function() {
      return {
        selectedCurrencies: {
          from: "",
          to: ""
        },
        picking: "to",
        isCurrencyPickerOpen: false,
        isCurrencyInvalid: false,
        rawInputValue: 0
      }
    },
    mounted(){
      this.getSelectedCurrencies();

      //listen to keypad button click
      eventBus.$on('keypad-clicked', (key) => {
        if(!isNaN(key)){
          this.rawInputValue = this.rawInputValue === 0 ? key : Number(`${this.rawInputValue}${key}`)
        } else if(key === 'clear'){
          this.rawInputValue = 0;
        } else {
          this.$router.push(`/convert/${this.selectedCurrencies.to}/${this.selectedCurrencies.from}`);
        }
      })
    },
    computed: {
      ...mapState(['currencies', 'baseEurRates']),
      converter(){
        const decimalFromValue = this.rawInputValue * 0.01;
        const toValue = decimalFromValue * this.conversionRate;
        return {
          from: {
            currency: this.selectedCurrencies.from || "USD",
            value: decimalFromValue.toFixed(2)
          },
          to: {
            currency: this.selectedCurrencies.to || "EUR",
            value: toValue.toFixed(2)
          }
        }
      },
      //computes conversion rate from baseEurRates
      conversionRate(){
        if(!this.selectedCurrencies.to || !this.selectedCurrencies.from){
          return 1;
        }
        return this.baseEurRates[this.selectedCurrencies.to]/this.baseEurRates[this.selectedCurrencies.from];
      }
    },
    methods: {
      togglePicker(currencyClicked = null){
        if(currencyClicked){
          this.picking = currencyClicked;
        }
        this.isCurrencyPickerOpen = !this.isCurrencyPickerOpen;
      },
      getSelectedCurrencies(){
        const { from, to } = this.$route.params;
        const currencyCodeList = this.currencies.map(({ code }) => code);

        //check that currency codes in the URL match our preselected currencies in the store
        if(currencyCodeList.includes(from.toUpperCase()) && currencyCodeList.includes(to.toUpperCase())){
          this.selectedCurrencies = {
            to: to.toUpperCase(),
            from: from.toUpperCase()
          }
          
          this.isCurrencyInvalid = false;
        }else{
          this.isCurrencyInvalid = true;
        }
      },
      switchRouteCurrency(data){
        const toCurrency = data.where === 'to' ? data.currency : this.selectedCurrencies.to;
        const fromCurrency = data.where === 'from' ? data.currency : this.selectedCurrencies.from;

        //avoid duplicate currencies
        if(toCurrency !== fromCurrency){

          //check if previous & current currency are similar to avoid redirecting to the same route
          if(toCurrency !== this.selectedCurrencies.to || fromCurrency !== this.selectedCurrencies.from){
            this.$router.push(`/convert/${fromCurrency}/${toCurrency}`);

            //close currency picker
            setTimeout(() => {
              this.isCurrencyPickerOpen = false;
            }, 400)
          }
          
        }else{
          alert("Cannot convert the same currency")
        }
      },
      currenciesToCommaSeparatedList
    },
    watch: {
      $route() {
        this.getSelectedCurrencies();
      }
    }
  };
</script>
