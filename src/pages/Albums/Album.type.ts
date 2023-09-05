import { AlbumsOptionType } from "../../apis/src/payload.types";

type AlbumsSelectorOptionLabelType = "Name" | "Year" | "Code";

export type AlbumsSelectorOptionType = {
  value: AlbumsOptionType;
  label: AlbumsSelectorOptionLabelType;
};
