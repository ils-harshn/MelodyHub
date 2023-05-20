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