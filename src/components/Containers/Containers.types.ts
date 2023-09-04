type SongContainerType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  optionTitle?: string;
};

export type ContentContainerType = SongContainerType;
export default SongContainerType;
