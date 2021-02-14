import scheduleAPI from "../../services/ScheduleAPI";

const SET_SCHEDULES = "SET_BARANGAY";

const state = {
  schedules: []
};

const mutations = {
  [SET_SCHEDULES](state, payload) {
    state.schedules = [...payload];
  }
};

const actions = {
  getSchedules: async ({ commit }, payload) => {
    const { data } = await scheduleAPI.show(payload);
    commit(SET_SCHEDULES, data);
  },
  addSchedule: async (state, payload) => {
    const { data } = await scheduleAPI.add(payload);
    return data;
  },
  reSchedule: async (state, payload) => {
    const { data } = await scheduleAPI.reSched(payload);
    return data;
  },
  deleteSchedule: async (state, payload) => {
    const { data } = await scheduleAPI.delete(payload);
    return data;
  },
  doneSchedule: async (state, payload) => {
    const { data } = await scheduleAPI.done(payload);
    return data;
  }
};

const getters = {
  schedules: state => state.schedules
};

export default {
  state,
  mutations,
  actions,
  getters
};
