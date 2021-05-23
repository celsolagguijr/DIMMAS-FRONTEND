import RequestAPI from "../../services/RequestAPI";

const SET_REQUESTS = "SET_REQUESTS";
const SET_REQUEST_TYPES = "SET_REQUEST_TYPES";
const SET_REQUEST_REPORT = "SET_REQUEST_REPORT";
const RESET_REQUEST_REPORT = "RESET_REQUEST_REPORT";

const state = {
  requests: [],
  requestTypes: [],
  requestReport: []
};

const mutations = {
  [SET_REQUESTS](state, payload) {
    state.requests = [...payload];
  },
  [SET_REQUEST_TYPES](state, payload) {
    state.requestTypes = [...payload];
  },
  [SET_REQUEST_REPORT](state, payload) {
    state.requestReport = [...payload];
  },
  [RESET_REQUEST_REPORT](state) {
    state.requestReport = [];
  }
};

const actions = {
  async getRequest({ commit }, payload) {
    const response = await RequestAPI.getRequest(payload);
    commit(SET_REQUESTS, response.data);
  },
  async getRequestTypes({ commit }) {
    const response = await RequestAPI.getRequestTypes();
    commit(SET_REQUEST_TYPES, response.data);
  },
  async createRequest(state, payload) {
    const response = await RequestAPI.createRequest(payload);
    return await response.data;
  },
  async updateRequest(state, payload) {
    const response = await RequestAPI.updateRequest(payload);
    return await response.data;
  },
  async deleteRequest(state, payload) {
    const response = await RequestAPI.deleteRequest(payload);
    return await response.data;
  },
  async requestAction(state, payload) {
    const response = await RequestAPI.requestAction(payload);
    return await response.data;
  },
  async generateReport({ commit }, payload) {
    const response = await RequestAPI.generateReport(payload);
    commit(SET_REQUEST_REPORT, response.data);
  },
  resetRequest({ commit }) {
    commit(RESET_REQUEST_REPORT);
  }
};

const getters = {
  allRequests: state => state.requests,
  requestTypes: state => state.requestTypes,
  requestReport: state =>
    state.requestReport.map(data => {
      const status = ["Pending", "Approved", "Disapproved"];
      return {
        ...data,
        request_status: status[data.request_status],
        expired_date: data.expired_date ? data.expired_date : "N/A"
      };
    })
};

export default {
  state,
  mutations,
  actions,
  getters
};
