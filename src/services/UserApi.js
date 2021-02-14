import API from "./API.config";
import axios from "axios";
const userURL = `${API.backend_url}/${`user/`}`;

const USERAPI = {
  auth: async form => {
    return await axios.post(userURL, { ...form });
  },
  add: async form => {
    return await axios.post(userURL, form);
  },
  edit: async form => {
    return await axios.put(userURL, form);
  },
  changePassword: async form => {
    return await axios.put(userURL, form);
  },
  validateUsername: async form => {
    return await axios.get(
      `${userURL}?request=${form.request}&username=${form.username}&id=${form.id}`
    );
  },
  showUser: async () => {
    return await axios.get(`${userURL}?request=getAllUser`);
  },
  getUserTypes: async () => {
    return await axios.get(`${userURL}?request=getUserType`);
  },
  getBarangayUsers: async () => {
    return await axios.get(`${userURL}?request=getBarangayUser`);
  }
};

export default USERAPI;
