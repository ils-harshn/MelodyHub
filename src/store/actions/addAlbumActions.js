import { ADD_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, INITIATE_ADD_ALBUM } from "./types"

export const initiateAddAlbumAction = (token, code, album, year, image1, image2, callback1, callback2) => {
    return {
        type: INITIATE_ADD_ALBUM,
        payload: {
            token,
            code,
            album, 
            year,
            image1,
            image2,
            callback1,
            callback2,
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