import API from "./API.config";
import axios from "axios";
const apiURL = `${API.backend_url}/${`barangay/`}`;

const BarangayAPI = {
  getBrgys: async request => {
    return await axios.get(`${apiURL}?request=${request}`);
  },
  addBarangay: async form => {
    return await axios.post(apiURL, form);
  },
  editBarangay: async form => {
    return await axios.put(apiURL, form);
  },
  deleteBarangay: async form => {
    return await axios.put(apiURL, form);
  }
};

export default BarangayAPI;
