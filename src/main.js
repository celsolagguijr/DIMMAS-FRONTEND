import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import * as VueGoogleMaps from "vue2-google-maps";
import Vant from "vant";
import "vant/lib/index.css";
import { Tabbar, TabbarItem } from "vant";
import { Col, Row } from "vant";
import { NavBar } from "vant";
import { Card } from "vant";
import { Divider } from "vant";
import { Grid, GridItem } from "vant";
import { Tag } from "vant";
import { List } from "vant";
import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";
import { Panel } from "vant";

Vue.use(Panel);
Locale.use("en-US", enUS);
Vue.use(List);
Vue.use(Tag);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Divider);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vant);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCkFAJxPsDKr-H7QVlvk6GKNmCgh4uFxO4",
    libraries: "places"
  }
});

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
