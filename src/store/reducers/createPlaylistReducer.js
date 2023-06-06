import * as type from "../actions/types"

const initailState = {
    error: null,
    loading: false,
    success: null,
}

const createPlaylistReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_CREATE_PLAYLIST:
            return {
                loading: true,
                error: null,
                success: false,
            }
        case type.CREATE_PLAYLIST_SUCCESS:
            return {
                loading: false,
                error: null,
                success: action.payload.success,
            }
        case type.CREATE_PLAYLIST_ERROR:
            return {
                loading: false,
                error: action.payload.error,
                success: false,
            }
        default:
            return initailState;
    }
}

export default createPlaylistReducer;