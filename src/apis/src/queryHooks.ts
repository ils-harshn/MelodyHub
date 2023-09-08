import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import QUERY_KEYS from "./queryKeys";
import {
  addSongToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAlbumDetail,
  getAlbumSongs,
  getAlbums,
  getArtistDetail,
  getArtistSongs,
  getArtists,
  getFilterSongs,
  getMostPopularSong,
  getPlaylistSongs,
  getPlaylistsWithFilter,
  getRecentSongs,
  loginUser,
  removeSongFromPlaylist,
  verifyToken,
} from "./queryFunctions";
import {
  AddSongToPlaylistPayload,
  AlbumsPayloadType,
  ArtistsPayloadType,
  CreatePlaylistPayload,
  DeletePlatlistPayload,
  FilterSongsPayloadType,
  GetAlbumDetailPayload,
  GetAlbumSongsPayload,
  GetArtistDetailPayload,
  GetArtistSongsPayload,
  GetPlaylistSongsPayloadType,
  GetPlaylistsWithFilterPayload,
  LoginPayloadType,
  OnlyPagePayloadType,
  RemoveSongFromPlaylistPayload,
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

export const useAlbumDetail = (
  token: TokenType,
  payload: GetAlbumDetailPayload,
  config = {}
) =>
  useQuery({
    queryFn: () => getAlbumDetail(token, payload),
    queryKey: [QUERY_KEYS.GET_ALBUM_DETAIL, payload],
    ...config,
  });

export const useAlbumSongsInfiniteQuery = (
  token: TokenType,
  payload: GetAlbumSongsPayload,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getAlbumSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.GET_ALBUM_SONGS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useArtistDetail = (
  token: TokenType,
  payload: GetArtistDetailPayload,
  config = {}
) =>
  useQuery({
    queryFn: () => getArtistDetail(token, payload),
    queryKey: [QUERY_KEYS.GET_ARTIST_DETAIL, payload],
    ...config,
  });

export const useArtistSongsInfiniteQuery = (
  token: TokenType,
  payload: GetArtistSongsPayload,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getArtistSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.GET_ARTIST_SONGS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useFilterPlaylistsInfiniteQuery = (
  token: TokenType,
  payload: GetPlaylistsWithFilterPayload,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getPlaylistsWithFilter(token, payload);
    },
    queryKey: [QUERY_KEYS.FILTERED_PLAYLISTS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useDeletePlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: DeletePlatlistPayload) =>
      deletePlaylist(token, payload),
    ...config,
  });

export const useCreatePlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: CreatePlaylistPayload) =>
      createPlaylist(token, payload),
    ...config,
  });

export const useAddSongToPlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: AddSongToPlaylistPayload) =>
      addSongToPlaylist(token, payload),
    ...config,
  });

export const usePlaylistSongsInfiniteQuery = (
  token: TokenType,
  payload: GetPlaylistSongsPayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getPlaylistSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.GET_PLAYLIST_SONGS_INFINITE_QUERY, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...config,
  });

export const useRemoveSongFromPlaylistMutation = (
  token: TokenType,
  config = {}
) =>
  useMutation({
    mutationFn: (payload: RemoveSongFromPlaylistPayload) =>
      removeSongFromPlaylist(token, payload),
    ...config,
  });
