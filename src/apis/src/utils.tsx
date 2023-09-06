import {
  AlbumsPayloadType,
  ArtistsPayloadType,
  FilterSongsPayloadType,
} from "./payload.types";
import { ArtistType } from "./response.types";

export const generateFilterSongsPayload = (payload: FilterSongsPayloadType) => {
  const newPayload = {
    original_name: "",
    album__code: "",
    album__title: "",
    artist__name: "",
    year: "",
    genre: "",
  };
  newPayload[payload.option] = payload.text;
  return newPayload;
};

export const generteAlbumsPayload = (payload: AlbumsPayloadType) => {
  const newPayload = {
    title: "",
    code: "",
    year: "",
  };

  newPayload[payload.option] = payload.text;
  return newPayload;
};

export const generteArtistsPayload = (payload: ArtistsPayloadType) => {
  const newPayload = {
    name: "",
  };

  newPayload[payload.option] = payload.text;
  return newPayload;
};

export const getPageNumberFromBEUrl = (url: string) => {
  const urlObj = new URL(url);
  const pageValue = urlObj.searchParams.get("page");
  return pageValue !== null ? pageValue : 1;
};

export const getIndexForInfiniteQuery = (
  pagesIndex: number,
  songIndex: number,
  limit: number = 24,
  indexing: 0 | 1 = 1
) => {
  return songIndex + indexing + pagesIndex * limit;
};

export const getArtistNameForGivenIdFromArtistSet = (
  artist_set: ArtistType[],
  id: number
) => artist_set.find((item) => item.id === id)?.name;
