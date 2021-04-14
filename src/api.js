import axios from "axios";

const api = axios.create({
  baseURL: "http://pipo-api.herokuapp.com",
});

export default api;
