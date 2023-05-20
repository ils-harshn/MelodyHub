import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASEURL;

export const getToken = (username, password) => {
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);

  let config = {
    method: 'post',
    url: `${BASE_URL}/api/accounts/token`,
    data: data
  };

  return axios.request(config);
}

export const verifyTokenApi = (token) => {
  let config = {
    method: 'post',
    url: `${BASE_URL}/api/accounts/verifytoken`,
    headers: {
      'Authorization': `Token ${token}`,
    },
  };

  return axios.request(config)
}

export const getLikedSongsApi = (token, page = 1) => {
  let config = {
    method: 'get',
    url: `${BASE_URL}/api/songs/liked/?page=${page}`,
    headers: {
      'Authorization': `Token ${token}`,
    },
  };

  return axios.request(config)
}

export const getMostViewedSongsApi = (token) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/songs/mostviewed/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };

  return axios.request(config)
}

export const searchSongsApi = (token, original_name = "", album__code = "", album__title = "", artist__name = "", year = "", genre = "", page = 1) => {
  let config = {
    method: 'get',
    url: `${BASE_URL}/api/songs/?page=${page}&original_name=${original_name}&album__code=${album__code}&album__title=${album__title}&artist__name=${artist__name}&year=${year}&genre=${genre}`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };

  return axios.request(config)
}