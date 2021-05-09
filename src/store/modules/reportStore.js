import Report from "../../services/reportAPI";

const SET_RECORD_DATA = "SET_RECORD_DATA";
const RESET_DATE = "RESET_DATE";

const state = {
  reportData: {
    labels: [],
    datasets: [
      {
        label: "Active Cases",
        borderColor: "red",
        fill: false,
        data: [],
      },
      {
        label: "Recoveries",
        borderColor: "green",
        fill: false,
        data: [],
      },
      {
        label: "Deaths",
        borderColor: "black",
        fill: false,
        data: [],
      },
    ],
  },
  rawData: [],
};

const mutations = {
  [SET_RECORD_DATA](state, payload) {
    state.reportData = {
      labels: [...payload.map((data) => data.DATES)],
      datasets: [
        {
          label: "Active Cases",
          borderColor: "red",
          fill: false,
          data: [...payload.map((data) => data.TOTAL_CASES)],
        },
        {
          label: "Recoveries",
          borderColor: "green",
          fill: false,
          data: [...payload.map((data) => data.TOTAL_RECOVERIES)],
        },
        {
          label: "Deaths",
          borderColor: "black",
          fill: false,
          data: [...payload.map((data) => data.TOTAL_DEATHS)],
        },
      ],
    };

    state.rawData = [...payload];
  },
  [RESET_DATE](state) {
    state.reportData = {
      labels: [],
      datasets: [
        {
          label: "Active Cases",
          borderColor: "red",
          fill: false,
          data: [],
        },
        {
          label: "Recoveries",
          borderColor: "green",
          fill: false,
          data: [],
        },
        {
          label: "Deaths",
          borderColor: "black",
          fill: false,
          data: [],
        },
      ],
    };
  },
};

const actions = {
  getReportData: async ({ commit }, request) => {
    const response = await Report.getData(request);
    commit(SET_RECORD_DATA, response.data);
  },
  resetReport: ({ commit }) => {
    commit(RESET_DATE);
  },
};

const getters = {
  reportData: (state) => state.reportData,
  rawData: (state) => state.rawData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
