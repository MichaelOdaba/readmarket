import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8009/",
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
