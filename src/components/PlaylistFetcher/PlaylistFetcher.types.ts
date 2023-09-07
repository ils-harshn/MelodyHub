import { SongType } from "../../apis/src/response.types";

export type PlaylistFetcherComponentType = {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToSong?: SongType,
};

export type PlaylistCreatorType = {
  onSuccessAdd?: () => void;
};
