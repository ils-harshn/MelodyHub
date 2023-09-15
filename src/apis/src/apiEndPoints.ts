const ENDPOINTS = {
  LOGIN: "/api/accounts/token",
  VERIFY_TOKEN: "/api/accounts/verifytoken",
  MOST_POPULAR_SONGS: "/api/songs/mostviewed/",
  GET_FILTERED_SONGS: (
    page = 1,
    original_name = "",
    album__code = "",
    album__title = "",
    artist__name = "",
    year = "",
    genre = ""
  ) =>
    `/api/songs/?page=${page}&original_name=${original_name}&album__code=${album__code}&album__title=${album__title}&artist__name=${artist__name}&year=${year}&genre=${genre}`,
  GET_RECENT_SONGS: (page = 1) => `/api/recent/songs/?page=${page}`,
  GET_ALBUMS: (page = 1, title = "", code = "", year = "") =>
    `/api/albums/?page=${page}&title=${title}&code=${code}&year=${year}`,
  GET_ALBUM_SONGS: (page = 1, id: number) =>
    `/api/albums/get/${id}/songs/?page=${page}`,
  GET_ALBUM_DETAIL: (id: number) => `/api/albums/get/${id}/`,
  GET_ARTISTS: (page = 1, name = "") =>
    `/api/artists/?name=${name}&page=${page}`,
  GET_ARTIST_DETAIL: (id: number) => `/api/artists/get/${id}/`,
  GET_ARTIST_SONGS: (page = 1, id: number) =>
    `/api/artists/get/${id}/songs/?page=${page}`,
  GET_PLAYLISTS_WITH_FILTER: (page = 1, title: string) =>
    `/api/songs/playlists/?title=${title}&page=${page}`,
  DELETE_PLAYLIST: (id: number) => `/api/songs/playlists/delete/${id}/`,
  CREATE_PLAYLIST: `/api/songs/playlists/create/`,
  ADD_SONG_TO_PLAYLIST: (playlist_id: number, song_id: number) =>
    `/api/songs/playlists/get/${playlist_id}/song/add/${song_id}/`,
  GET_PLAYLIST_SONGS: (page = 1, id: number) =>
    `/api/songs/playlists/get/${id}/songs/?page=${page}`,
  REMOVE_SONG_FROM_PLAYLIST: (playlist_id: number, song_id: number) =>
    `/api/songs/playlists/get/${playlist_id}/song/delete/${song_id}/`,
  REACT_ON_A_SONG: (song_id: number) => `/api/songs/reaction/${song_id}/`,
  NETRALIZE_REACTION_ON_A_SONG: `/api/songs/neutral/`,
  GET_RANDOM_SONG: `/api/random/song/`,
  SET_TO_RECENT_SONG: (song_id: number) => `/api/songs/get/${song_id}/`,
  GET_LIKED_SONGS: (page = 1) => `/api/songs/liked/?page=${page}`,
};

export default ENDPOINTS;
