import PageContentAPI from "../../services/PageContentAPI";

const SET_CONTENTS = "SET_CONTENTS";
const SET_CATEGORIES = "SET_CATEGORIES";

const state = {
  contents: [],
  content_categories: []
};

const mutations = {
  [SET_CONTENTS](state, payload) {
    state.contents = [...payload];
  },
  [SET_CATEGORIES](state, payload) {
    state.content_categories = [...payload];
  }
};

const actions = {
  async getContentCategories({ commit }) {
    const { data } = await PageContentAPI.getContentCategories();
    commit(SET_CATEGORIES, data);
  },
  async addContent(state, payload) {
    const { data } = await PageContentAPI.addContent(payload);
    return data;
  },
  async getPosts({ commit }, type) {
    const { data } = await PageContentAPI.getPosts(type);
    commit(SET_CONTENTS, data);
  },
  async editContent(state, payload) {
    const { data } = await PageContentAPI.editContent(payload);
    return data;
  },
  async deleteContent(state, payload) {
    const { data } = await PageContentAPI.deleteContent(payload);
    return data;
  },
  async getinformation(state, payload) {
    const { data } = await PageContentAPI.getInformation(payload);
    return data;
  }
};

const getters = {
  contents: state => state.contents,
  content_categories: state => state.content_categories
};

export default {
  state,
  mutations,
  actions,
  getters
};
