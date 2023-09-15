import {
  FilterSongsPayloadType,
  GetAlbumSongsPayload,
  GetArtistSongsPayload,
  GetPlaylistSongsPayloadType,
} from "../../apis/src/payload.types";
import { SongType } from "../../apis/src/response.types";

export type FilteredSongsListType = {
  index: number;
  pageNumber: number;
  payload: FilterSongsPayloadType;
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
