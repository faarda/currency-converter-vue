import Vue from "vue";
import VueRouter from "vue-router";
import Converter from "../views/Converter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/convert/USD/GBP"
  },
  {
    path: "/convert/:from/:to",
    component: Converter
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
