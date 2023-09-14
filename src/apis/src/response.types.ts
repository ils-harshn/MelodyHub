import { UserDataType } from "../../hooks/TokenHooks";

export type LoginResponseType = UserDataType;

export type ArtistType = {
  id: number;
  name: string;
  artists_thumbnail: string;
  artists_thumbnail300x300: string;
};

export type AlbumType = {
  id: number;
  code: string;
  title: string;
  year: number;
  thumbnail300x300: string;
  thumbnail: string;
  uploaded_at: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type ReactionNeutralType = "neutral";
export type ReactionType = "like" | "dislike";

export type SongType = {
  id: number;
  album: AlbumType;
  artist_set: ArtistType[];
  reaction: ReactionType | ReactionNeutralType;
  genre: GenreType;
  title: string;
  url: string;
  original_name: string;
  views: number;
  uploaded_at: string;
};

export type FilterSongsResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SongType[];
};

export type PlaylistResponseType = {
  id: number;
  title: string;
};
