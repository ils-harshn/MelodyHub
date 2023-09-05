import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import QUERY_KEYS from "./queryKeys";
import {
  getAlbums,
  getArtists,
  getFilterSongs,
  getMostPopularSong,
  getRecentSongs,
  loginUser,
  verifyToken,
} from "./queryFunctions";
import {
  AlbumsPayloadType,
  ArtistsPayloadType,
  FilterSongsPayloadType,
  LoginPayloadType,
  OnlyPagePayloadType,
} from "./payload.types";
import { TokenType } from "../../contexts/Context.types";
import { getPageNumberFromBEUrl } from "./utils";

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
    queryKey: [QUERY_KEYS.FILTERED_SONGS, payload],
    queryFn: () => getFilterSongs(token, payload),
    ...config,
  });

export const useFilterSongsInfiniteQuery = (
  token: TokenType,
  payload: FilterSongsPayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getFilterSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.FILTERED_SONGS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useRecentSongsInfiniteQuery = (
  token: TokenType,
  payload: OnlyPagePayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getRecentSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.RECENT_SONGS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useAlbumsInfiniteQuery = (
  token: TokenType,
  payload: AlbumsPayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getAlbums(token, payload);
    },
    queryKey: [QUERY_KEYS.ALBUMS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useArtistsInfiniteQuery = (
  token: TokenType,
  payload: ArtistsPayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getArtists(token, payload);
    },
    queryKey: [QUERY_KEYS.ARTISTS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });
