import { makeRoute } from "../utils";

// Account Nested
export const INDEX = makeRoute("/");
export const AUTH_LAYOUT = makeRoute("account");

// INDEX NESTED URLS
export const HOME = makeRoute("home", INDEX.endpoint);
export const SEARCH = makeRoute("search", INDEX.endpoint);
export const LIBRARY = makeRoute("library", INDEX.endpoint);
export const CREATE_PLAYLIST = makeRoute("createplaylist", INDEX.endpoint);
export const LIKED_SONGS = makeRoute("likedsongs", INDEX.endpoint);

// INDEX - ALBUM_NESTED
export const ALBUM_NESTED = makeRoute("album");
export const ALBUM = makeRoute("list", INDEX.endpoint, ALBUM_NESTED.endpoint);

// INDEX - ARTIST_NESTED
export const ARTIST_NESTED = makeRoute("artist");
export const ARTIST = makeRoute("list", INDEX.endpoint, ARTIST_NESTED.endpoint);

// AUTH_LAYOUT NESTED URLS
export const LOGIN = makeRoute("login", AUTH_LAYOUT.endpoint);
export const FORGET_PASSWORD = makeRoute(
  "forgetpassword",
  AUTH_LAYOUT.endpoint
);

export default INDEX;
