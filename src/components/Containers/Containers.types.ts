type SongContainerType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  optionTitle?: string;
};

export type ContentContainerType = SongContainerType;
export type ImageCardContainerType = SongContainerType;
export default SongContainerType;
