import * as type from "../actions/deletePlaylistReducerActions.js"

const initailState = {
    error: null,
    loading: false,
    success: null,
}

const deletePlaylistReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_DELETE_PLAYLIST:
            return {
                loading: true,
                error: null,
                success: false,
            }
        case type.DELETE_PLAYLIST_SUCCESS:
            return {
                loading: false,
                error: null,
                success: action.payload.success,
            }
        case type.DELETE_PLAYLIST_ERROR:
            return {
                loading: false,
                error: action.payload.error,
                success: false,
            }
        default:
            return initailState;
    }
}

export default deletePlaylistReducer;