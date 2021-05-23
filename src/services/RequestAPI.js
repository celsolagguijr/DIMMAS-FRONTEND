import API from "./API.config";
import axios from "axios";
const requestURL = `${API.backend_url}/request/`;

const REQUESTAPI = {
  getRequest: async form => {
    const url =
      form.userType && form.id
        ? `${requestURL}?request=${form.request}&userType=${form.userType}&id=${form.id}`
        : `${requestURL}?request=${form.request}`;
    return await axios.get(url);
  },
  getRequestTypes: async () => {
    const url = `${requestURL}?request=requestTypes`;
    return await axios.get(url);
  },
  createRequest: async form => {
    return await axios.post(requestURL, form);
  },
  updateRequest: async form => {
    return await axios.put(requestURL, form);
  },
  deleteRequest: async form => {
    return await axios.put(requestURL, form);
  },
  requestAction: async form => {
    return await axios.post(requestURL, form);
  },
  generateReport: async form => {
    const url = `${requestURL}?request=${form.request}&barangay_id=${form.barangay_id}&from=${form.filterFrom}&to=${form.filterTo}`;
    return await axios.get(url);
  }
};

export default REQUESTAPI;
