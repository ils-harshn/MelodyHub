import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

export const loginUserApi = (email, password) => {
  let data = new FormData();
  data.append('username', email);
  data.append('password', password);

  let config = {
    method: 'POST',
    url: `/api/accounts/token`,
    data: data
  };

  return axios.request(config);
}
