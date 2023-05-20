import * as type from "../actions/likedSongsActions.js"

const initailState = {
    data: null,
    error: null,
    loading: true,
}

const likedSongsReducers = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_LIKED_SONGS:
            return {
                ...state,
                loading: true,        
                error: null,
            }
        case type.GET_LIKED_SONGS_SUCCESS:
            return {
                data: action.payload.data,
                loading: false,
                error: null,
            }
        case type.GET_LIKED_SONGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default likedSongsReducers;