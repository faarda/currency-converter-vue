import Vue from "vue";
import Vuex from "vuex";
import { currenciesToCommaSeparatedList } from "../utils/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [
      {
        name: "US DOLLAR",
        symbol: "$",
        code: "USD",
      },
      {
        name: "POUND STERLING",
        symbol: "£",
        code: "GBP",
      },
      {
        name: "EURO",
        symbol: "€",
        code: "EUR",
      },
      {
        name: "CHINESE YUAN",
        symbol: "¥",
        code: "CNY",
      },
      {
        name: "INDIAN RUPEE",
        symbol: "₹",
        code: "INR",
      },
    ],
    baseEurRates: {},
  },
  mutations: {
    ADD_RATES: (state, payload) => {
      state.baseEurRates = payload;
    },
  },
  actions: {
    //fetch exchange rates with EUR as the base
    fetchBaseEurRates: (context) => {
      return new Promise((resolve, reject) => {
        const symbolsList = currenciesToCommaSeparatedList(
          context.state.currencies
        );
        /*fetch(
          `http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER_API_KEY}&base=EUR&symbols=${symbolsList}&format=1`
        )*/
        //use netlify serverless function
        fetch(`/.netlify/functions/get-eur-exchange-rates?symbols=${symbolsList}`)
          .then(response => response.json())
          .then((data) => {
            console.log(data)
            if (data.success) {
              context.commit("ADD_RATES", data.rates);
              resolve("ok");
            } else {
              reject("something went wrong");
            }
          })
          .catch((err) => reject(err));
      });
    },
  },
});
