import { SongType } from "../../apis/src/response.types";

export type SongCardType = React.HTMLAttributes<HTMLDivElement> & {
  data: SongType;
};
