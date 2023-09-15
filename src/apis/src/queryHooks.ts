import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import QUERY_KEYS from "./queryKeys";
import {
  addRecentSong,
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
  getLikedSongs,
  getMostPopularSong,
  getPlaylistSongs,
  getPlaylistsWithFilter,
  getRandomSong,
  getRecentSongs,
  loginUser,
  neutralizeReactionOnSong,
  reactOnSong,
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
  NeutralizeReactionOnSongType,
  OnlyIdPayloadType,
  OnlyPagePayloadType,
  ReactOnSongPayloadType,
  RemoveSongFromPlaylistPayload,
} from "./payload.types";
import { getPageNumberFromBEUrl } from "./utils";
import { TokenType } from "../../hooks/TokenHooks";

const commonConfig = {
  retry: false,
  refetchOnWindowFocus: false,
};

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: LoginPayloadType) =>
      loginUser(payload.email, payload.password),
    mutationKey: [QUERY_KEYS.LOGIN_USER],
    ...commonConfig,
    ...config,
  });

export const useVerifyTokenMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: TokenType) => verifyToken(payload),
    ...commonConfig,
    ...config,
  });

export const useMostPopularSongs = (token: TokenType, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOST_POPULAR_SONGS],
    queryFn: () => getMostPopularSong(token),
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
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
    ...commonConfig,
    ...config,
  });

export const useDeletePlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: DeletePlatlistPayload) =>
      deletePlaylist(token, payload),
    ...commonConfig,
    ...config,
  });

export const useCreatePlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: CreatePlaylistPayload) =>
      createPlaylist(token, payload),
    ...commonConfig,
    ...config,
  });

export const useAddSongToPlaylistMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: AddSongToPlaylistPayload) =>
      addSongToPlaylist(token, payload),
    ...commonConfig,
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
    ...commonConfig,
    ...config,
  });

export const useRemoveSongFromPlaylistMutation = (
  token: TokenType,
  config = {}
) =>
  useMutation({
    mutationFn: (payload: RemoveSongFromPlaylistPayload) =>
      removeSongFromPlaylist(token, payload),
    ...commonConfig,
    ...config,
  });

export const useReactOnASongMutation = (token: TokenType, config = {}) =>
  useMutation({
    mutationFn: (payload: ReactOnSongPayloadType) =>
      reactOnSong(token, payload),
    mutationKey: [QUERY_KEYS.REACT_ON_A_SONG],
    ...commonConfig,
    ...config,
  });

export const useNeutralizeReactionOnSongMutation = (
  token: TokenType,
  config = {}
) =>
  useMutation({
    mutationFn: (payload: NeutralizeReactionOnSongType) =>
      neutralizeReactionOnSong(token, payload),
    mutationKey: [QUERY_KEYS.NEUTRALIZE_REACTION_ON_A_SONG],
    ...commonConfig,
    ...config,
  });

export const useRandomSong = (token: TokenType, config = {}) =>
  useQuery({
    queryFn: () => getRandomSong(token),
    queryKey: [QUERY_KEYS.GET_RANDOM_SONG],
    ...commonConfig,
    ...config,
  });

export const useAddToRecentSong = (
  token: TokenType,
  payload: OnlyIdPayloadType,
  config = {}
) =>
  useQuery({
    queryFn: () => addRecentSong(token, payload),
    queryKey: [QUERY_KEYS.ADD_TO_RECENT_SONG],
    ...commonConfig,
    ...config,
  });

export const useLikedSongsInfiniteQuery = (
  token: TokenType,
  payload: OnlyPagePayloadType,
  config = {}
) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      payload.page = pageParam;
      return getLikedSongs(token, payload);
    },
    queryKey: [QUERY_KEYS.GET_LIKED_SONGS, payload],
    getNextPageParam: (lastpage: any) => {
      return lastpage.next && lastpage.count
        ? getPageNumberFromBEUrl(lastpage.next)
        : undefined;
    },
    ...commonConfig,
    ...config,
  });
