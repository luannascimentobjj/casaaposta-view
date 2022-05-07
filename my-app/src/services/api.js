import axios from "axios"

const api = axios.create({
  baseURL: "http://191.252.59.151:81/"
});

export default api;