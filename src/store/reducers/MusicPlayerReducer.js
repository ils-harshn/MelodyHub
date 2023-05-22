import * as actionTypes from "../actions/MusicPlayerActions"

const initailState = {
    current: 400,
}
const MusicPlayerReducer = (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.SET_SONG_ID:
            return {
                ...state,
                current: action.payload.id,
            }
        default:
            return state
    }
}

export default MusicPlayerReducer;