import { TokenType } from "../../contexts/Context.types";
import api, { getAuthHeader } from "../api";
import ENDPOINTS from "./apiEndPoints";

export const loginUser = async (email: string, password: string) => {
  const response = await api({
    method: "post",
    url: ENDPOINTS.LOGIN,
    data: {
      username: email,
      password: password,
    },
  });
  return response.data;
};

export const verifyToken = async (token: TokenType) => {
  const response = await api({
    method: "post",
    url: ENDPOINTS.VERIFY_TOKEN,
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};
