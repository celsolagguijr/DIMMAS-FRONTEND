import API from "./API.config";
import axios from "axios";

const apiURL = `${API.backend_url}/${`cases/`}`;

const Report = {
  getData: async filterData => {
    return await axios.get(
      `${apiURL}?request=${filterData.request}&barangay=${filterData.barangay}&filterDateBy=${filterData.filterDateBy}&customDateFrom=${filterData.customDateFrom}&customDateTo=${filterData.customDateTo}`
    );
  }
};

export default Report;
