import axios from "axios";

// in production, there is no local host, so we use relative/dynamic path
const BASEURL = import.meta.env.MODE == "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASEURL,
});

export default api;