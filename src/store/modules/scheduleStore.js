import scheduleAPI from "../../services/ScheduleAPI";

const SET_SCHEDULES = "SET_BARANGAY";
const SET_SCHEDULE_REPORT = "SET_SCHEDULE_REPORT";
const RESET_SCHEDULE_REPORT = "RESET_SCHEDULE_REPORT";

const state = {
  schedules: [],
  scheduleReport: []
};

const mutations = {
  [SET_SCHEDULES](state, payload) {
    state.schedules = [...payload];
  },
  [SET_SCHEDULE_REPORT](state, payload) {
    state.scheduleReport = [...payload];
  },
  [RESET_SCHEDULE_REPORT](state) {
    state.scheduleReport = [];
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
  },
  async generateScheduleReport({ commit }, payload) {
    const response = await scheduleAPI.generateReport(payload);
    commit(SET_SCHEDULE_REPORT, response.data);
  },
  resetScheduleReport({ commit }) {
    commit(RESET_SCHEDULE_REPORT);
  }
};

const getters = {
  schedules: state => state.schedules,
  scheduleReport: state =>
    state.scheduleReport.map(data => {
      const status = ["Pending", "Done"];

      return {
        ...data,
        STATUS: status[data.STATUS]
      };
    })
};

export default {
  state,
  mutations,
  actions,
  getters
};
