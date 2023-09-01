export type LoginPayloadType = {
  email: string;
  password: string;
};

export type FilterSongsPayloadType = {
  page?: number;
  original_name?: string;
  album__code?: string;
  album__title?: string;
  artist__name?: string;
  year?: number | "";
  genre?: string;
};
