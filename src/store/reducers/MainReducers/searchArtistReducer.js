import { INITIATE_SEARCH_ARTIST, RESET_SEARCH_ARTIST, SEARCH_ARTIST_FAILURE, SEARCH_ARTIST_SUCCESS } from "../../actions/types";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

const searchArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_SEARCH_ARTIST:
            return initialState
        case INITIATE_SEARCH_ARTIST:
            return {
                ...initialState,
                loading: true,
            } 
        case SEARCH_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload.data,
            }
        case SEARCH_ARTIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default searchArtistReducer;
