import { FilterOptionType } from "../../apis/src/payload.types";

type FilterSelectorOptionLabelType =
  | "Song"
  | "Album"
  | "Album Code"
  | "Artist"
  | "Year"
  | "Genre";

export type FilterSelectorOptionType = {
  value: FilterOptionType;
  label: FilterSelectorOptionLabelType;
};
