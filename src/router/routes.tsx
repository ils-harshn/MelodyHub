import { makeRoute } from "../utils";

// Account Nested
export const AUTH_LAYOUT = {
  path: "account",
  endpoint: makeRoute("account"),
};

// AUTH_LAYOUT NESTED URLS
export const LOGIN = {
  path: "login",
  endpoint: makeRoute("login", AUTH_LAYOUT.endpoint),
};

export const FORGET_PASSWORD = {
  path: "forgetpassword",
  endpoint: makeRoute("forgetpassword", AUTH_LAYOUT.endpoint),
};

// INDEX NESTED URLS
export const INDEX = {
  path: "/",
  endpoint: makeRoute("/"),
};

export const HOME = {
  path: "home",
  endpoint: makeRoute("home", INDEX.endpoint),
};

export const SEARCH = {
  path: "search",
  endpoint: makeRoute("search", INDEX.endpoint),
};

export const LIBRARY = {
  path: "library",
  endpoint: makeRoute("library", INDEX.endpoint),
};

export const PLAYLIST_SONGS = {
  path: "playlist/:name/:id",
  endpoint: (name: string, id: number) =>
    makeRoute(`playlist/${name}/${id}`, INDEX.endpoint),
};

export const LIKED_SONGS = {
  path: "likedsongs",
  endpoint: makeRoute("likedsongs", INDEX.endpoint),
};

// INDEX - ALBUM_NESTED
export const ALBUM_NESTED = {
  path: "album",
  endpoint: makeRoute("album", INDEX.endpoint),
};

export const ALBUM = {
  path: "list",
  endpoint: makeRoute("list", ALBUM_NESTED.endpoint),
};

export const ALBUM_SONGS = {
  path: "get/:id",
  endpoint: (id: number) => makeRoute(`get/${id}`, ALBUM_NESTED.endpoint),
};

// INDEX - ARTIST_NESTED
export const ARTIST_NESTED = {
  path: "artist",
  endpoint: makeRoute("artist", INDEX.endpoint),
};

export const ARTIST = {
  path: "list",
  endpoint: makeRoute("list", ARTIST_NESTED.endpoint),
};

export const ARTIST_SONGS = {
  path: "get/:id",
  endpoint: (id: number) => makeRoute(`get/${id}`, ARTIST_NESTED.endpoint),
};

export default INDEX;
