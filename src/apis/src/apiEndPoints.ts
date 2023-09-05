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
  GET_ALBUM_DETAIL: (id: number) => `/api/albums/get/${id}/`,
  GET_ARTISTS: (page = 1, name = "") =>
    `/api/artists/?name=${name}&page=${page}`,
};

export default ENDPOINTS;
