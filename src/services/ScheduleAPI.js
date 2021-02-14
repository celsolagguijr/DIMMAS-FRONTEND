import API from "./API.config";
import axios from "axios";
const scheduleurl = `${API.backend_url}/${`schedule/`}`;

const SCHEDAPI = {
  show: async form =>
    await axios.get(
      `${scheduleurl}?request=${form.request}&id=${form.id}&userType=${form.userType}`
    ),
  add: async form => await axios.post(scheduleurl, form),
  reSched: async form => await axios.put(scheduleurl, form),
  delete: async form => await axios.put(scheduleurl, form),
  done: async form => await axios.put(scheduleurl, form)
};

export default SCHEDAPI;
