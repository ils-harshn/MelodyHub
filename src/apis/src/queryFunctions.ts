import { TokenType } from "../../contexts/Context.types";
import api, { getAuthHeader } from "../api";
import ENDPOINTS from "./apiEndPoints";
import { FilterSongsPayloadType } from "./payload.types";
import { generateFilterSongsPayload } from "./utils";

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

export const getMostPopularSong = async (token: TokenType) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.MOST_POPULAR_SONGS,
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getFilterSongs = async (
  token: TokenType,
  payload: FilterSongsPayloadType
) => {
  const generatedPayload = generateFilterSongsPayload(payload);
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_FILTERED_SONGS(
      payload.page,
      generatedPayload.original_name,
      generatedPayload.album__code,
      generatedPayload.album__title,
      generatedPayload.artist__name,
      generatedPayload.year,
      generatedPayload.genre
    ),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};
