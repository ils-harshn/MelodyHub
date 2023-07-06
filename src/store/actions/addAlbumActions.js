import { ADD_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, INITIATE_ADD_ALBUM } from "./types"

export const initiateAddAlbumAction = (token, album, year, file, callback) => {
    return {
        type: INITIATE_ADD_ALBUM,
        payload: {
            token,
            album, 
            year,
            file,
            callback,
        }
    }
}

export const addAlbumSuccessAction = (data) => {
    return {
        type: ADD_ALBUM_SUCCESS,
        payload: {
            data,
        }
    }
}

export const addAlbumErrorAction = (error) => {
    return {
        type: ADD_ALBUM_FAILURE,
        payload: {
            error,
        }
    }
}