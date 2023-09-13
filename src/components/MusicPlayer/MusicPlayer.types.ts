type MusicPlayerType = React.HTMLAttributes<HTMLDivElement> & {};

export type MusicOptionType = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export default MusicPlayerType;
