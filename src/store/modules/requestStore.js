import RequestAPI from "../../services/RequestAPI";

const SET_REQUESTS = "SET_REQUESTS";
const SET_REQUEST_TYPES = "SET_REQUEST_TYPES";

const state = {
  requests: [],
  requestTypes: []
};

const mutations = {
  [SET_REQUESTS](state, payload) {
    state.requests = [...payload];
  },
  [SET_REQUEST_TYPES](state, payload) {
    state.requestTypes = [...payload];
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
  }
};

const getters = {
  allRequests: state => state.requests,
  requestTypes: state => state.requestTypes
};

export default {
  state,
  mutations,
  actions,
  getters
};
