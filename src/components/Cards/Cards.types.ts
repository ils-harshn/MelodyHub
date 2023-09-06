import { SongType } from "../../apis/src/response.types";
import { IconType } from "../../assests/icons.types";

export type SongCardType = React.HTMLAttributes<HTMLDivElement> & {
  data: SongType;
};

export type ContentCardType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  Icon?: IconType;
};

export type OptionPopupType = {
  data: SongType;
  handlePlay: () => void;
  isPlaying: boolean;
};

export type ImageCardType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  optionTitle?: string;
  src: string;
  alt?: string;
};

export type LoadMoreCardType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  isLoading: boolean;
  isDisabled: boolean;
};

export type SongCardLandscapeType = SongCardType & {
  index: number;
};
