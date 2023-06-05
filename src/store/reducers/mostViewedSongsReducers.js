import * as type from "../actionsTypes/mostViewedSongsActions.js"

const initailState = {
    data: null,
    error: null,
    loading: true,
}

const mostViewedSongsReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_GET_MOST_VIEWED_SONGS:
            return {
                ...state,
                loading: true,        
                error: null,
            }
        case type.GET_MOST_VIEWED_SONGS_SUCCESS:
            return {
                data: action.payload.data,
                loading: false,
                error: null,
            }
        case type.GET_MOST_VIEWED_SONGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default mostViewedSongsReducer;