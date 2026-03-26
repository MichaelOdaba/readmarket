import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8009/",
  withCredentials: true,
});

export default customAxios;
