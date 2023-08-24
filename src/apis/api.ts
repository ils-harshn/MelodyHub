import axios from "axios";
import { AxiosConfig } from "./index.types";

const BASE_URL = process.env.REACT_APP_BASEURL;

const api = (config: AxiosConfig, baseURL?: string) => {
  baseURL = baseURL || BASE_URL;
  return axios({
    ...config,
    baseURL: baseURL,
  });
};

export default api;
