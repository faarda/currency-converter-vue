import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [],
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
