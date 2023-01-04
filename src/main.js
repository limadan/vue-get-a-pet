import { createApp } from "vue";
//import { library } from "@fortawesome/fontawesome-svg-core";

import App from "./App.vue";
import router from "./router";
import Vue3Material from 'vue3-material';
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(Vue3Material)

app.mount("#app");
