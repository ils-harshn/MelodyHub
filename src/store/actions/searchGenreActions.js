import { INITIATE_SEARCH_GENRE, RESET_SEARCH_GENRE, SEARCH_GENRE_FAILURE, SEARCH_GENRE_SUCCESS } from "./types"

export const initiateSearchGenreAction = (token, name) => {
    return {
        type: INITIATE_SEARCH_GENRE,
        payload: {
            token,
            name,
        }
    }
}

export const searchGenreSuccessAction = (data) => {
    return {
        type: SEARCH_GENRE_SUCCESS,
        payload: {
            data,
        }
    }
}

export const searchGenreErrorAction = (error) => {
    return {
        type: SEARCH_GENRE_FAILURE,
        payload: {
            error,
        }
    }
}

export const resetSearchGenreAction = () => {
    return {
        type: RESET_SEARCH_GENRE,
    }
}