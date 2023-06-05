import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

export const getToken = (username, password) => {
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);

  let config = {
    method: 'post',
    url: `/api/accounts/token`,
    data: data
  };

  return axios.request(config);
}

export const verifyTokenApi = (token) => {
  let config = {
    method: 'post',
    url: `/api/accounts/verifytoken`,
    headers: {
      'Authorization': `Token ${token}`,
    },
  };

  return axios.request(config)
}

export const getLikedSongsApi = (token, page = 1) => {
  let config = {
    method: 'get',
    url: `/api/songs/liked/?page=${page}`,
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
    url: `/api/songs/mostviewed/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };

  return axios.request(config)
}

export const searchSongsApi = (token, original_name = "", album__code = "", album__title = "", artist__name = "", year = "", genre = "", page = 1) => {
  let config = {
    method: 'get',
    url: `/api/songs/?page=${page}&original_name=${original_name}&album__code=${album__code}&album__title=${album__title}&artist__name=${artist__name}&year=${year}&genre=${genre}`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };

  return axios.request(config)
}

export const getSongByIdApi = (token, id) => {
  let config = {
    method: 'get',
    url: `/api/songs/get/${id}/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };

  return axios.request(config);
}

export const likeSongApi = (token, id) => {
  let data = new FormData();
  data.append('reaction', 'like');
  let config = {
    method: 'post',
    url: `/api/songs/reaction/${id}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: data
  };

  return axios.request(config)
}

export const neutralizeReactionApi = (token, id) => {
  let data = new FormData();
  data.append('id', `${id}`);

  let config = {
    method: 'post',
    url: `/api/songs/neutral/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: data
  };

  return axios.request(config)
}


export const registerApi = (email, password, password2, first_name, last_name) => {
  let data = new FormData();
  data.append('email', email)
  data.append('password', password)
  data.append('password2', password2)
  data.append('first_name', first_name)
  data.append('last_name', last_name)

  let config = {
    method: 'post',
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
    method: 'post',
    url: `/api/accounts/verify`,
    data: data
  };

  return axios.request(config)
}

export const createPlaylistApi = (token, title) => {
  let data = new FormData();
  data.append('title', title);
  let config = {
    method: 'post',
    url: `/api/songs/playlists/create/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: data
  };

  return axios.request(config)
}

export const recentSongsApi = (token, page = 1) => {
  let config = {
    method: 'get',
    url: `/api/recent/songs/?page=${page}`,
    headers: {
      'Authorization': `Token ${token}`
    }
  };
  return axios.request(config)
}

export const getPlaylistsApi = (token, title="", page=1) => {
  let config = {
    method: 'get',
    url: `/api/songs/playlists/?title=${title}&page=${page}`,
    headers: { 
      'Authorization': `Token ${token}`
    }
  };
  
  return axios.request(config)
}

export const deletePlaylistApi = (token, id) => {
  let config = {
    method: 'delete',
    url: `/api/songs/playlists/delete/${id}/`,
    headers: { 
      'Authorization': `Token ${token}`, 
    },
  };
  
  return axios.request(config)
}