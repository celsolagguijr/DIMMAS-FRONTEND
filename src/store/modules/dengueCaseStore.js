import DengueCaseAPI from "../../services/dengueCasesAPI";

const SET_DENGUE_CASES = "SET_DENGUE_CASES";
const SET_YEARS = "SET_YEARS";
const SET_DAILY_CASES = "SET_DAILY_CASES";
const RESET_RECORDS = "RESET_RECORDS";

const state = {
  cardData: {
    TOTAL_CASES: "0",
    TOTAL_RECOVERIES: "0",
    TOTAL_DEATHS: "0"
  },
  chartPerMonth: {
    labels: [],
    total_cases: [],
    total_recoveries: [],
    total_deaths: []
  },
  chartPerBrgy: [],
  years: [],
  dailyCases: []
};

const mutations = {
  [SET_DENGUE_CASES](state, { cardData, chartPerMonth, chartPerBrgy }) {
    state.cardData.TOTAL_CASES = cardData.TOTAL_CASES;
    state.cardData.TOTAL_RECOVERIES = cardData.TOTAL_RECOVERIES;
    state.cardData.TOTAL_DEATHS = cardData.TOTAL_DEATHS;

    state.chartPerMonth.labels = [...chartPerMonth.labels];
    state.chartPerMonth.total_cases = [...chartPerMonth.total_cases];
    state.chartPerMonth.total_recoveries = [...chartPerMonth.total_recoveries];
    state.chartPerMonth.total_deaths = [...chartPerMonth.total_deaths];

    state.chartPerBrgy = [...chartPerBrgy];
  },
  [SET_YEARS](state, years) {
    state.years = [...years];
  },
  [SET_DAILY_CASES](state, payload) {
    state.dailyCases = [...payload];
  },
  [RESET_RECORDS](state, payload) {
    state.dailyCases = payload;
  }
};

const actions = {
  getDengueCases: async ({ commit }, request) => {
    const response = await DengueCaseAPI.getDashBoard(request);
    commit(SET_DENGUE_CASES, response.data);
  },
  getYears: async ({ commit }) => {
    const response = await DengueCaseAPI.getLatestYear();
    commit(SET_YEARS, response.data);
    return response.data;
  },
  addCase: async (state, payload) => {
    const response = await DengueCaseAPI.addCase(payload);
    return response;
  },
  getDailyCases: async ({ commit }, payload) => {
    const response = await DengueCaseAPI.getDailyCases(payload);
    commit(SET_DAILY_CASES, response.data);
  },
  resetRecords: ({ commit }) => {
    commit(RESET_RECORDS, []);
  }
};

const getters = {
  getDengueCases: state => state.cardData,
  getchartPerMonth: state => {
    const chartData = state.chartPerMonth;

    return {
      labels: chartData.labels,
      datasets: [
        {
          label: "Active Cases",
          backgroundColor: "#DC3545",
          data: chartData.total_cases
        },
        {
          label: "Recovery",
          backgroundColor: "#28A745",
          data: chartData.total_recoveries
        },
        {
          label: "Death",
          backgroundColor: "#000",
          data: chartData.total_deaths
        }
      ]
    };
  },
  chartBrgyData: state => {
    const chartDatas = state.chartPerBrgy;

    return {
      labels: [...chartDatas.map(data => data.brgy)],
      datasets: [
        {
          label: "Active Cases",
          backgroundColor: "#DC3545",
          data: [
            ...chartDatas.map(data => (data.total_cases ? data.total_cases : 0))
          ]
        },
        {
          label: "Recoveries",
          backgroundColor: "#28A745",
          data: [
            ...chartDatas.map(data =>
              data.total_recoveries ? data.total_recoveries : 0
            )
          ]
        },
        {
          label: "Deaths",
          backgroundColor: "#000",
          data: [
            ...chartDatas.map(data =>
              data.total_deaths ? data.total_deaths : 0
            )
          ]
        }
      ]
    };
  },
  markers: state => {
    const chartDatas = state.chartPerBrgy;

    return [
      ...chartDatas.map(data => {
        return {
          position: {
            lat: Number(data.lat),
            lng: Number(data.lng),
            name: data.brgy,
            dengueRecord: {
              cases: data.total_cases,
              recovery: data.total_recoveries,
              death: data.total_deaths
            }
          }
        };
      })
    ];
  },
  getYears: state => state.years,
  dailyCases: state => state.dailyCases
};

export default {
  state,
  mutations,
  actions,
  getters
};
