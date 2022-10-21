import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadFonts } from "./plugins/webfontloader";
import { createVuetify } from "vuetify";

loadFonts();

const vuetify = createVuetify();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
