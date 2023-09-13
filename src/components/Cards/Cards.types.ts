import { DATA_SHARING_FOR_PLAYLIST_TYPE } from "../../apis/src/queryKeys";
import { PlaylistResponseType, SongType } from "../../apis/src/response.types";
import { IconType } from "../../assests/icons.types";

export type SongCardType = React.HTMLAttributes<HTMLDivElement> & {
  data: SongType;
  type?: DATA_SHARING_FOR_PLAYLIST_TYPE;
  index?: number;
  pageNumber?: number;
  payload?: {};
};

export type ContentCardType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  Icon?: IconType;
  disabled?: boolean;
};

export type OptionPopupType = {
  data: SongType;
  handlePlay: () => void;
  isPlaying: boolean;
};

export type OptionPopupSongCardLandscapeType = OptionPopupType & {
  showingForPlaylistId?: number;
  onRemoveFromPlaylistSuccess?: () => void;
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
  varient?: "primary" | "secondary";
};

export type SongCardLandscapeType = SongCardType & {
  index: number;
  showingForPlaylistId?: number;
  onRemoveFromPlaylistSuccess?: () => void;
};

export type PlaylistCardType = React.HTMLAttributes<HTMLDivElement> & {
  data: PlaylistResponseType;
  onDeleteSuccess?: () => void;
  onSongAddSuccess?: () => void;
  addToSong?: SongType;
};
