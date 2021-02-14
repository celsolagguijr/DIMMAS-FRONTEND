import BarangayAPI from "../../services/barangayAPI";

const SET_BARANGAY = "SET_BARANGAY";
const ADD_BARANGAY = "ADD_BARANGAY";
const EDIT_BARANGAY = "EDIT_BARANGAY";

const state = {
  barangays: []
};

const mutations = {
  [SET_BARANGAY](state, payload) {
    state.barangays = [...payload];
  },
  [ADD_BARANGAY](state, payload) {
    state.barangays = [...state.barangays, payload];
  },
  [EDIT_BARANGAY](state, payload) {
    state.barangays = state.barangays.map(data =>
      data.id !== payload.id
        ? data
        : {
            id: payload.id,
            name: payload.name,
            latitude: payload.lat,
            longtitude: payload.lng
          }
    );
  }
};

const actions = {
  getBrgys: async ({ commit }) => {
    const { data } = await BarangayAPI.getBrgys("show");
    commit(SET_BARANGAY, data);
  },
  addBarangay: async ({ commit }, payload) => {
    await BarangayAPI.addBarangay(payload);
    const { data } = await BarangayAPI.getBrgys("show");
    commit(SET_BARANGAY, data);
    // commit(ADD_BARANGAY, data.savedData);
  },
  editBarangay: async ({ commit }, payload) => {
    const response = await BarangayAPI.editBarangay(payload);
    if (response.data.status === 200) {
      commit(EDIT_BARANGAY, payload);
    } else {
      console.log(response);
    }
  }
};

const getters = {
  showBrgys: state =>
    state.barangays.map(({ id, name, latitude, longtitude }, index) => {
      const location = `[${latitude},${longtitude}]`;
      return {
        num: index + 1,
        id,
        name,
        location,
        lat: latitude,
        lng: longtitude
      };
    })
};

export default {
  state,
  mutations,
  actions,
  getters
};
