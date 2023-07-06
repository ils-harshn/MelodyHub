import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

export const createAlbumAPI = (token, code, title, year, thumbnail, thumbnail300x300) => {
    let data = new FormData();
    data.append('code', code);
    data.append('title', title);
    data.append('year', year);
    data.append('thumbnail', thumbnail);
    data.append('thumbnail300x300', thumbnail300x300);

    let config = {
        method: 'post',
        url: `/api/admin/create/album/`,
        headers: {
            'Authorization': `Token ${token}`,
        },
    };
    return axios.request(config);
}