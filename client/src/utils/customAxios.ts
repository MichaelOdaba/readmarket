import axios from "axios";
import { auth } from "../config/firebase";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8009/",
  withCredentials: true, // This automatically sends HTTP-only cookies
});

// Attach Firebase ID token to Authorization header when available
customAxios.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        if (!config.headers) config.headers = {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore token attach errors and allow request to proceed
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
