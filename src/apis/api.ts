import axios from "axios";
import { AxiosConfig } from "./index.types";
import { TokenType } from "../hooks/TokenHooks";

const BASE_URL = process.env.REACT_APP_BASEURL;

export const getAuthHeader = (token: TokenType) => ({
  Authorization: `Token ${token}`,
});

const api = (config: AxiosConfig, baseURL?: string) => {
  baseURL = baseURL || BASE_URL;
  return axios({
    ...config,
    baseURL: baseURL,
  });
};

export default api;
