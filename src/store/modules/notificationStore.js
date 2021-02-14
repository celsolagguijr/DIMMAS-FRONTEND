import NotificationAPI from "../../services/notifcationAPI";

const SET_TOTAL_NOTIFICATION = "SET_TOTAL_NOTIFICATION";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

const state = {
  total_notification: 0,
  notifications: []
};

const mutations = {
  [SET_TOTAL_NOTIFICATION](state, payload) {
    state.total_notification = payload;
  },
  [SET_NOTIFICATIONS](state, payload) {
    state.notifications = payload;
  }
};

const actions = {
  setTotalNotification({ commit }, payload) {
    commit(SET_TOTAL_NOTIFICATION, payload);
  },
  async getNotifications({ commit }, payload) {
    const result = await NotificationAPI.getNotifications(payload);
    commit(SET_NOTIFICATIONS, result.data);
  },
  resetNotifications({ commit }) {
    commit(SET_NOTIFICATIONS, []);
  }
};

const getters = {
  getTotalNotification: state => state.total_notification,
  getNotifications: state => state.notifications
};

export default {
  state,
  mutations,
  actions,
  getters
};
