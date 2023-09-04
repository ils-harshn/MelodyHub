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
