import { FilterSongsPayloadType } from "./payload.types";

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
