import API from "./API.config";
import axios from "axios";
const apiURL = `${API.backend_url}/${`cases/`}`;

const dengueCasesAPI = {
  getDashBoard: async data => {
    return await axios.get(
      `${apiURL}?request=${data.request}&year=${data.year}`
    );
  },
  getLatestYear: async () => {
    return await axios.get(`${apiURL}?request=getYears`);
  },
  getDailyCases: async form => {
    return await axios.get(
      `${apiURL}?request=getRecords&from=${form.from}&to=${form.to}`
    );
  },
  addCase: async form => {
    return await axios.post(apiURL, form);
  }
};

export default dengueCasesAPI;
