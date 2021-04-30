import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [
      {
        name: "US DOLLAR",
        symbol: "$",
        code: "USD"
      },
      {
        name: "POUND STERLING",
        symbol: "£",
        code: "GBP"
      },
      {
        name: "EURO",
        symbol: "€",
        code: "EUR"
      },
      {
        name: "CHINESE YUAN",
        symbol: "¥",
        code: "CNY"
      },
      {
        name: "INDIAN RUPEE",
        symbol: "₹",
        code: "INR"
      }
    ],
    baseEurRates: {},
  },
  mutations: {
    ADD_RATES: (state, payload) => {
      state.baseEurRates = payload;
    },
  },
  actions: {
    fetchBaseEurRates: (context) => {
      return new Promise((resolve, reject) => {
        const symbolsList = context.state.currencies.map(({code}) => code).filter(code => code !== 'EUR').join(",");
          fetch(`http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER_API_KEY}&base=EUR&symbols=${symbolsList}&format=1`)
          .then(response => response.json())
          .then(data => {
            if(data.success){
              context.commit('ADD_RATES', {...data.rates, EUR: 1})
              resolve('ok');
            }else{
              reject('something went wrong');
            }
          })
          .catch(err => reject(err))
      })
    },
  },
});
