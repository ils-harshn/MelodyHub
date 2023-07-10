import { ADD_ARTIST_FAILURE, ADD_ARTIST_SUCCESS, INITIATE_ADD_ARTIST, RESET_ADD_ARTIST } from "../../actions/types";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

const addArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_ADD_ARTIST:
            return initialState
        case INITIATE_ADD_ARTIST:
            return {
                ...initialState,
                loading: true,
            } 
        case ADD_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload.data,
            }
        case ADD_ARTIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default addArtistReducer;
