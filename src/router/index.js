import Vue from "vue";
import VueRouter from "vue-router";
import Converter from "../views/Converter.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/convert/USD/GBP",
  },
  {
    path: "/convert/:from/:to",
    component: Converter,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
