export type PlaylistFetcherComponentType = {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToSongid?: number,
};

export type PlaylistCreatorType = {
  onSuccessAdd?: () => void;
};
