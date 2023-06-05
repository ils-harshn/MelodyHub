import axios from "axios";
import axiosWithAuth from "./axiosInstances";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

export const getToken = (username, password) => {
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);

  let config = {
    method: 'POST',
    url: `/api/accounts/token`,
    data: data
  };

  return axios.request(config);
}

export const verifyTokenApi = (token) => {
  let config = {
    method: 'POST',
    url: `/api/accounts/verifytoken`,
  };

  return axiosWithAuth.request(config)
}

export const getLikedSongsApi = (token, page = 1) => {
  let config = {
    method: 'GET',
    url: `/api/songs/liked/?page=${page}`,
  };

  return axiosWithAuth.request(config)
}

export const getMostViewedSongsApi = (token) => {
  let config = {
    method: 'GET',
    url: `/api/songs/mostviewed/`,
  };

  return axiosWithAuth.request(config)
}

export const searchSongsApi = (token, original_name = "", album__code = "", album__title = "", artist__name = "", year = "", genre = "", page = 1) => {
  let config = {
    method: 'GET',
    url: `/api/songs/?page=${page}&original_name=${original_name}&album__code=${album__code}&album__title=${album__title}&artist__name=${artist__name}&year=${year}&genre=${genre}`,
  };

  return axiosWithAuth.request(config)
}

export const getSongByIdApi = (token, id) => {
  let config = {
    method: 'GET',
    url: `/api/songs/get/${id}/`,
  };

  return axiosWithAuth.request(config);
}

export const likeSongApi = (token, id) => {
  let data = new FormData();
  data.append('reaction', 'like');
  let config = {
    method: 'POST',
    url: `/api/songs/reaction/${id}/`,
    data: data
  };

  return axiosWithAuth.request(config)
}

export const neutralizeReactionApi = (token, id) => {
  let data = new FormData();
  data.append('id', `${id}`);

  let config = {
    method: 'POST',
    url: `/api/songs/neutral/`,
    data: data
  };

  return axiosWithAuth.request(config)
}


export const registerApi = (email, password, password2, first_name, last_name) => {
  let data = new FormData();
  data.append('email', email)
  data.append('password', password)
  data.append('password2', password2)
  data.append('first_name', first_name)
  data.append('last_name', last_name)

  let config = {
    method: 'POST',
    url: `/api/accounts/register`,
    data: data
  };

  return axios.request(config);
}

export const verifyOTPApi = (email, code) => {
  let data = new FormData();
  data.append('email', email);
  data.append('code', code);

  let config = {
    method: 'POST',
    url: `/api/accounts/verify`,
    data: data
  };

  return axios.request(config)
}

export const createPlaylistApi = (token, title) => {
  let data = new FormData();
  data.append('title', title);
  let config = {
    method: 'POST',
    url: `/api/songs/playlists/create/`,
    data: data
  };

  return axiosWithAuth.request(config)
}

export const recentSongsApi = (token, page = 1) => {
  let config = {
    method: 'GET',
    url: `/api/recent/songs/?page=${page}`,
  };
  return axiosWithAuth.request(config)
}

export const getPlaylistsApi = (token, title = "", page = 1) => {
  let config = {
    method: 'GET',
    url: `/api/songs/playlists/?title=${title}&page=${page}`,
  };

  return axiosWithAuth.request(config)
}

export const deletePlaylistApi = (token, id) => {
  let config = {
    method: 'delete',
    url: `/api/songs/playlists/delete/${id}/`,
  };

  return axiosWithAuth.request(config)
}