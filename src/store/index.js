import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/userStore";
import dengueCaseStore from "./modules/dengueCaseStore";
import barangayStore from "./modules/barangayStore";
import notificationStore from "./modules/notificationStore";
import requestStore from "./modules/requestStore";
import scheduleStore from "./modules/scheduleStore";
import pageContentStore from "./modules/pageContentStore";
import reportStore from "./modules/reportStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    dengueCaseStore,
    barangayStore,
    notificationStore,
    requestStore,
    scheduleStore,
    pageContentStore,
    reportStore
  }
});
