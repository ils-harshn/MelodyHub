import { ADD_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, INITIATE_ADD_ALBUM } from "../../actions/types";

// reducer.js
const initialState = {
    loading: false,
    error: null,
};

const addAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
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
