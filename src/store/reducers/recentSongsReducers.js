import * as type from "../actions/types"

const initailState = {
    data: null,
    error: null,
    loading: true,
}

const recentSongsReducers = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_RECENT_SONGS:
            return {
                ...state,
                loading: true,        
                error: null,
            }
        case type.GET_RECENT_SONGS_SUCCESS:
            return {
                data: action.payload.data,
                loading: false,
                error: null,
            }
        case type.GET_RECENT_SONGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default recentSongsReducers;