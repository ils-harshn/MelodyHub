import * as type from "../actions/searchSongsActions.js"

const initailState = {
    data: null,
    error: null,
    loading: true,
}

const searchSongsReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_SEARCH_SONGS:
            return {
                ...state,
                loading: true,        
                error: null,
            }
        case type.GET_SEARCHED_SONGS_SUCCESS:
            return {
                data: action.payload.data,
                loading: false,
                error: null,
            }
        case type.GET_SEARCHED_SONGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default searchSongsReducer;