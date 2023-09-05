export type LoginPayloadType = {
  email: string;
  password: string;
};

export type FilterOptionType =
  | "original_name"
  | "album__code"
  | "album__title"
  | "artist__name"
  | "year"
  | "genre";

export type FilterSongsPayloadType = {
  page?: number;
  text: string;
  option: FilterOptionType;
};

export type AlbumsOptionType = "title" | "code" | "year";

export type AlbumsPayloadType = {
  page?: number;
  text: string;
  option: AlbumsOptionType;
};

export type ArtistsOptionType = "name";

export type ArtistsPayloadType = {
  page?: number;
  text: string;
  option: ArtistsOptionType;
};

export type OnlyPagePayloadType = {
  page?: number;
};

export type GetAlbumDetailPayload = {
  id: number;
};
