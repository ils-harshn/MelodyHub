export type PlaylistFetcherComponentType = {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PlaylistCreatorType = {
  onSuccessAdd?: () => void;
};
