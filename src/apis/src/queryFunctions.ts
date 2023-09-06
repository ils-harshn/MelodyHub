import { TokenType } from "../../contexts/Context.types";
import api, { getAuthHeader } from "../api";
import ENDPOINTS from "./apiEndPoints";
import {
  AlbumsPayloadType,
  ArtistsPayloadType,
  FilterSongsPayloadType,
  GetAlbumDetailPayload,
  GetAlbumSongsPayload,
  GetArtistDetailPayload,
  GetArtistSongsPayload,
  GetPlaylistsWithFilterPayload,
  OnlyPagePayloadType,
} from "./payload.types";
import {
  generateFilterSongsPayload,
  generteAlbumsPayload,
  generteArtistsPayload,
} from "./utils";

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

export const getRecentSongs = async (
  token: TokenType,
  payload: OnlyPagePayloadType
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_RECENT_SONGS(payload.page),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getAlbums = async (
  token: TokenType,
  payload: AlbumsPayloadType
) => {
  const generatedPayload = generteAlbumsPayload(payload);
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ALBUMS(
      payload.page,
      generatedPayload.title,
      generatedPayload.code,
      generatedPayload.year
    ),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getArtists = async (
  token: TokenType,
  payload: ArtistsPayloadType
) => {
  const generatedPayload = generteArtistsPayload(payload);
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ARTISTS(payload.page, generatedPayload.name),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getAlbumDetail = async (
  token: TokenType,
  payload: GetAlbumDetailPayload
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ALBUM_DETAIL(payload.id),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getAlbumSongs = async (
  token: TokenType,
  payload: GetAlbumSongsPayload
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ALBUM_SONGS(payload.page, payload.id),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getArtistDetail = async (
  token: TokenType,
  payload: GetArtistDetailPayload
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ARTIST_DETAIL(payload.id),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getArtistSongs = async (
  token: TokenType,
  payload: GetArtistSongsPayload
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_ARTIST_SONGS(payload.page, payload.id),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};

export const getPlaylistsWithFilter = async (
  token: TokenType,
  payload: GetPlaylistsWithFilterPayload
) => {
  const response = await api({
    method: "get",
    url: ENDPOINTS.GET_PLAYLISTS_WITH_FILTER(payload.page, payload.text),
    headers: {
      ...getAuthHeader(token),
    },
  });
  return response.data;
};
