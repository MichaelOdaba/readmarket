import axios from "axios";
import { baseURL } from "../services/SummaryAPI";

const customAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// attach token to every request
customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customAxios;
