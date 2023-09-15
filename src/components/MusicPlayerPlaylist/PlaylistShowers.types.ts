import {
  FilterSongsPayloadType,
  GetAlbumSongsPayload,
  GetArtistSongsPayload,
  GetPlaylistSongsPayloadType,
  OnlyPagePayloadType,
} from "../../apis/src/payload.types";
import { SongType } from "../../apis/src/response.types";

export type FilteredSongsListType = {
  index: number;
  pageNumber: number;
  payload: FilterSongsPayloadType;
};

export type LikedSongsListType = {
  index: number;
  pageNumber: number;
  payload: OnlyPagePayloadType;
};

export type PlaylistSongsListType = {
  index: number;
  pageNumber: number;
  payload: GetPlaylistSongsPayloadType;
};

export type AlbumSongsListType = {
  index: number;
  pageNumber: number;
  payload: GetAlbumSongsPayload;
};

export type ArtistSongsListType = {
  index: number;
  pageNumber: number;
  payload: GetArtistSongsPayload;
};

export type SingleSongSelectedType = {
  song: SongType;
};
