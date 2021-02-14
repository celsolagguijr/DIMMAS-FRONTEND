import UserAPI from "../../services/UserApi";

const EDIT_USER = "EDIT_USER";
const SET_USERS = "SET_USERS";
const SET_USER_TYPES = "SET_USER_TYPES";
const SET_BARANGAY_USERS = "SET_BARANGAY_USERS";

const state = {
  users: [],
  user_types: [],
  barangayUsers: []
};

const mutations = {
  [EDIT_USER](state, payload) {
    state.users = state.users.map(data => {
      return data.id === payload.id ? payload : data;
    });
  },
  [SET_USERS](state, payload) {
    state.users = [...payload];
  },
  [SET_USER_TYPES](state, payload) {
    state.user_types = [...payload];
  },
  [SET_BARANGAY_USERS](state, payload) {
    state.barangayUsers = [...payload];
  }
};

const actions = {
  AUTH: async (state, form) => {
    const response = await UserAPI.auth(form);
    return response.data;
  },
  create: async (state, form) => {
    const response = await UserAPI.add(form);
    return response.data;
  },
  edit: async ({ commit }, form) => {
    const response = await UserAPI.edit(form);
    if (response.data.status !== 200) return response.data;
    commit(EDIT_USER, response.data);
    return response.data;
  },
  getUsers: async ({ commit }) => {
    const response = await UserAPI.showUser();
    commit(SET_USERS, response.data);
  },
  changePassword: async (state, form) => {
    const response = await UserAPI.changePassword(form);
    return response.data;
  },
  validateUsername: async (state, form) => {
    const response = await UserAPI.validateUsername(form);
    return response.data;
  },
  getUserTypes: async ({ commit }) => {
    const response = await UserAPI.getUserTypes();
    commit(SET_USER_TYPES, response.data);
  },
  getBarangayUsers: async ({ commit }) => {
    const response = await UserAPI.getBarangayUsers();
    commit(SET_BARANGAY_USERS, response.data);
  }
};

const getters = {
  getUsers: state => state.users,
  getUserTypes: state => state.user_types,
  barangayUsers: state => state.barangayUsers
};

export default {
  state,
  mutations,
  actions,
  getters
};
