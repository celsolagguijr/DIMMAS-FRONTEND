import API from "./API.config";
import axios from "axios";
const notificationURL = `${API.backend_url}/${`notification/apis.php`}`;

const USERAPI = {
  getNotifications: async form => {
    const url =
      form.from == null && form.to == null
        ? `${notificationURL}?request=showNotification&id=${form.id}`
        : `${notificationURL}?request=showNotification&id=${form.id}&from=${form.from}&to=${form.to}`;
    return await axios.get(url);
  }
};

export default USERAPI;
