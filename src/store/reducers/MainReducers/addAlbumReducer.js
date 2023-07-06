import { ADD_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, INITIATE_ADD_ALBUM, RESET_ADD_ALBUM } from "../../actions/types";

const initialState = {
    loading: false,
    error: null,
    success: null,
};

const addAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_ADD_ALBUM:
            return initialState
        case INITIATE_ADD_ALBUM:
            return {
                ...initialState,
                loading: true,
            } 
        case ADD_ALBUM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload.data,
            }
        case ADD_ALBUM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default addAlbumReducer;
