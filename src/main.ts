import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import Notifications from "vue-notification";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

Vue.use(PiniaVuePlugin);
Vue.use(Notifications);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
