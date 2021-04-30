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
        name: "BRITISH POUND",
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
    rates: {},
  },
  mutations: {
    ADD_RATES: (state, payload) => {
      const { currency, rates } = payload;
      state.rates[currency] = rates;
    },
  },
  actions: {
    fetchRates: async () => {},
  },
});
