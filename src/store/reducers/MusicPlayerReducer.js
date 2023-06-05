import { get_last_played_song, set_last_played_song } from "../../utils"
import * as actionTypes from "../actionsTypes/MusicPlayerActions"

const initailState = {
    current: get_last_played_song(),
}
const MusicPlayerReducer = (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.SET_SONG_ID:
            set_last_played_song(action.payload.id)
            return {
                ...state,
                current: action.payload.id,
            }
        default:
            return state
    }
}

export default MusicPlayerReducer;