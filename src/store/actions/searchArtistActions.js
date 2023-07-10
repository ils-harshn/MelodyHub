import { INITIATE_SEARCH_ARTIST, RESET_SEARCH_ARTIST, SEARCH_ARTIST_FAILURE, SEARCH_ARTIST_SUCCESS } from "./types"

export const initiateSearchArtistAction = (token, title) => {
    return {
        type: INITIATE_SEARCH_ARTIST,
        payload: {
            token,
            title,
        }
    }
}

export const searchArtistSuccessAction = (data) => {
    return {
        type: SEARCH_ARTIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const searchArtistErrorAction = (error) => {
    return {
        type: SEARCH_ARTIST_FAILURE,
        payload: {
            error,
        }
    }
}

export const resetSearchArtistAction = () => {
    return {
        type: RESET_SEARCH_ARTIST,
    }
}