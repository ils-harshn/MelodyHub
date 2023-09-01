import { useMutation, useQuery } from "react-query";
import QUERY_KEYS from "./queryKeys";
import {
  getFilterSongs,
  getMostPopularSong,
  loginUser,
  verifyToken,
} from "./queryFunctions";
import { FilterSongsPayloadType, LoginPayloadType } from "./payload.types";
import { TokenType } from "../../contexts/Context.types";

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: LoginPayloadType) =>
      loginUser(payload.email, payload.password),
    mutationKey: [QUERY_KEYS.LOGIN_USER],
    ...config,
  });

export const useVerifyTokenMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: TokenType) => verifyToken(payload),
    ...config,
  });

export const useMostPopularSongs = (token: TokenType, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOST_POPULAR_SONGS],
    queryFn: () => getMostPopularSong(token),
    ...config,
  });

export const useFilterSongs = (
  token: TokenType,
  payload: FilterSongsPayloadType,
  config = {}
) =>
  useQuery({
    queryKey: [QUERY_KEYS.FILTERED_SONGS, payload.original_name],
    queryFn: () => getFilterSongs(token, payload),
    ...config,
  });
