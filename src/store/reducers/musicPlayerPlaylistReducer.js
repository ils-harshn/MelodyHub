import * as type from "../actions/types"

const initailState = {
    show: false,
}

const musicPlayerPlaylistReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.SHOW_PLAYLIST:
            return {
                show: true,
            }
        case type.HIDE_PLAYLIST:
            return {
                show: false,
            }
        case type.TOGGLE_PLAYLIST:
            return {
                show: !state.show,
            }
        default:
            return state;
    }
}

export default musicPlayerPlaylistReducer;