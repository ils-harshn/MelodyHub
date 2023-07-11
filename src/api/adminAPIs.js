import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

export const createAlbumAPI = (token, code, title, year, thumbnail300x300, thumbnail1200x1200) => {
    let data = new FormData();
    data.append('code', code);
    data.append('title', title);
    data.append('year', year);
    data.append('thumbnail', thumbnail1200x1200);
    data.append('thumbnail300x300', thumbnail300x300);

    let config = {
        method: 'post',
        url: `/api/admin/create/album/`,
        headers: {
            'Authorization': `Token ${token}`,
        },
        data,
    };
    return axios.request(config);
}

export const checkAlbumCodeExistsAPI = (token, code) => {
    let config = {
        method: 'get',
        url: `/api/admin/albums/?page=1&code=${code}`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };

    return axios.request(config)
}

export const checkAlbumTitleExistsAPI = (token, title) => {
    let config = {
        method: 'get',
        url: `/api/admin/albums/?page=1&title=${title}`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };

    return axios.request(config)
}

export const createArtistAPI = (token, name, thumbnail300x300, thumbnail1200x1200) => {
    let data = new FormData();
    data.append('name', name);
    data.append('artists_thumbnail300x300', thumbnail300x300);
    data.append('artists_thumbnail', thumbnail1200x1200);

    let config = {
        method: 'post',
        url: `/api/admin/create/artist/`,
        headers: {
            'Authorization': `Token ${token}`,
        },
        data,
    };
    return axios.request(config);
}

export const checkArtistNameExistsAPI = (token, name) => {
    let config = {
        method: 'get',
        url: `/api/admin/artists/?name=${name}`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };

    return axios.request(config)
}

export const checkGenreNameExistsAPI = (token, name) => {    
    let config = {
        method: 'get',
        url: `/api/admin/genres/?name=${name}`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };

    return axios.request(config)
}

export const checkSongTitleExistsAPI = (token, title) => {    
    let config = {
        method: 'get',
        url: `/api/songs/?page=1&original_name=${title}`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };

    return axios.request(config)
}

export const createSongAPI = (token, data) => {    
    let config = {
        method: 'post',
        url: `/api/admin/create/song/`,
        headers: {
            'Authorization': `Token ${token}`,
        },
        data,
    };

    return axios.request(config)
}