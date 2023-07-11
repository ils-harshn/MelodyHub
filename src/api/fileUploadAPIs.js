import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

const uploadFileAPI = (token, file, folder_id, onUploadProgress) => {
    let data = new FormData();
    data.append('id', folder_id);
    data.append('file', file);

    let config = {
        method: 'post',
        url: `/api/admin/create/file/`,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: data,
        onUploadProgress,
    };
    return axios.request(config);
}

const uploadAPIs = {
    TEMP: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1stqR8PnPwraHY0ZGW5auInHbySaK0qcf", onUploadProgress),
    ALBUM_300x300: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1sGrSDSM0FBq9NdBpRvv4f9smndt4iUWI", onUploadProgress),
    ALBUM_1200x1200: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1fV6zglA2OVIJ9UXrV3TS-5oEmcjUFQi9", onUploadProgress),
    ARTIST_300x300: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1jWfuWchJOGcr07pk9ieAcFWbZN-kGSsC", onUploadProgress),
    ARTIST_1200x1200: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1fZ56wh1X7aLfsBMIwczii1KfRbxvwuW4", onUploadProgress),
    MP3: (token, file, onUploadProgress) => uploadFileAPI(token, file, "1-1tx9A1PMqqR9Y8GLdCiDt5mPBEQzXux", onUploadProgress),
}

export default uploadAPIs