type SongContainerType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  optionTitle?: string;
};

export type ContentContainerType = SongContainerType;
export type ImageCardContainerType = SongContainerType;
export type SongCardLandscapeContainerType = SongContainerType;
export type PlaylistCardContainerType = SongContainerType & {
  onClickClose: () => void;
};
export default SongContainerType;
