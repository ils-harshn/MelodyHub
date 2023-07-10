import { ADD_ARTIST_FAILURE, ADD_ARTIST_SUCCESS, INITIATE_ADD_ARTIST, RESET_ADD_ARTIST } from "./types"

export const initiateAddArtistAction = (token, name, image1, image2, callback1, callback2) => {
    return {
        type: INITIATE_ADD_ARTIST,
        payload: {
            token,
            name,
            image1,
            image2,
            callback1,
            callback2,
        }
    }
}

export const addArtistSuccessAction = (data) => {
    return {
        type: ADD_ARTIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const addArtistErrorAction = (error) => {
    return {
        type: ADD_ARTIST_FAILURE,
        payload: {
            error,
        }
    }
}

export const resetAddArtistAction = () => {
    return {
        type: RESET_ADD_ARTIST,
    }
}