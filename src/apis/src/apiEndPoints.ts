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
    year: number | "" = "",
    genre = ""
  ) =>
    `/api/songs/?page=${page}&original_name=${original_name}&album__code=${album__code}&album__title=${album__title}&artist__name=${artist__name}&year=${year}&genre=${genre}`,
};

export default ENDPOINTS;
