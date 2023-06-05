import axios from 'axios';
import { get_token } from '../utils';

const axiosWithAuth = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
});

axiosWithAuth.interceptors.request.use((req) => {
    const token = get_token();
    req.headers.Authorization = `Token ${token}`;
    return req;
});

export default axiosWithAuth;
