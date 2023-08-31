export type LoginResponseType = {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  date_joined: string;
  is_active: boolean;
};

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

export type ReactionType = "neutral" | "like" | "dislike";

export type SongType = {
  id: number;
  album: AlbumType;
  artist_set: ArtistType[];
  reaction: ReactionType;
  genre: GenreType;
  title: string;
  url: string;
  original_name: string;
  views: number;
  uploaded_at: string;
};
