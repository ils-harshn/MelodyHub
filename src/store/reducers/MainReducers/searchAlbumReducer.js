import { INITIATE_SEARCH_ALBUM, RESET_SEARCH_ALBUM, SEARCH_ALBUM_FAILURE, SEARCH_ALBUM_SUCCESS } from "../../actions/types";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

const searchAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_SEARCH_ALBUM:
            return initialState
        case INITIATE_SEARCH_ALBUM:
            return {
                ...initialState,
                loading: true,
            } 
        case SEARCH_ALBUM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload.data,
            }
        case SEARCH_ALBUM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default searchAlbumReducer;
