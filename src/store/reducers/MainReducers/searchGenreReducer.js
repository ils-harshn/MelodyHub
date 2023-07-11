import { INITIATE_SEARCH_GENRE, RESET_SEARCH_GENRE, SEARCH_GENRE_FAILURE, SEARCH_GENRE_SUCCESS } from "../../actions/types";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

const searchGenreReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_SEARCH_GENRE:
            return initialState
        case INITIATE_SEARCH_GENRE:
            return {
                ...initialState,
                loading: true,
            } 
        case SEARCH_GENRE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload.data,
            }
        case SEARCH_GENRE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default searchGenreReducer;
