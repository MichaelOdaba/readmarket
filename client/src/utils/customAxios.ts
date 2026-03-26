import axios from "axios";
import { baseURL } from "../services/SummaryAPI";

const customAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default customAxios;
