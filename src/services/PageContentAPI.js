import API from "./API.config";
import axios from "axios";
const pageContentUrl = `${API.backend_url}/${`pagecontent/`}`;

const PageContentAPI = {
  getContentCategories: async () =>
    await axios.get(`${pageContentUrl}?request=getContentCategories`),
  addContent: async form => await axios.post(`${pageContentUrl}`, form),
  editContent: async form => await axios.put(`${pageContentUrl}`, form),
  deleteContent: async form => await axios.put(`${pageContentUrl}`, form),
  getPosts: async type =>
    await axios.get(`${pageContentUrl}?request=show&type=${type}`),
  getInformation: async id =>
    await axios.get(`${pageContentUrl}?request=viewInformation&id=${id}`)
};

export default PageContentAPI;
