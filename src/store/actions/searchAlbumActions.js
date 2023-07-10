import { INITIATE_SEARCH_ALBUM, RESET_SEARCH_ALBUM, SEARCH_ALBUM_FAILURE, SEARCH_ALBUM_SUCCESS } from "./types"

export const initiateSearchAlbumAction = (token, title) => {
    return {
        type: INITIATE_SEARCH_ALBUM,
        payload: {
            token,
            title,
        }
    }
}

export const searchAlbumSuccessAction = (data) => {
    return {
        type: SEARCH_ALBUM_SUCCESS,
        payload: {
            data,
        }
    }
}

export const searchAlbumErrorAction = (error) => {
    return {
        type: SEARCH_ALBUM_FAILURE,
        payload: {
            error,
        }
    }
}

export const resetSearchAlbumAction = () => {
    return {
        type: RESET_SEARCH_ALBUM,
    }
}