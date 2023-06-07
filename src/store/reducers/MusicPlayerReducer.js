import { get_last_played_song, set_last_played_song } from "../../utils"
import * as actionTypes from "../../store/actions/types"

const initailState = {
    randomly: false,
    playlistId: null,
    data: [get_last_played_song()],
    current: 0,
    page: null,
}
const MusicPlayerReducer = (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.SET_SONG_ID:
            set_last_played_song(JSON.stringify(action.payload.song))
            return {
                ...state,
                randomly: false,
                current: action.payload.index,
                data: action.payload.data,
                playlistId: action.payload.playlistId,
            }
        case actionTypes.SET_NEXT_INDEX:
            return {
                ...state,
                randomly: false,
                current: state.current + 1,
            }
        case actionTypes.SET_PREV_INDEX:
            return {
                ...state,
                randomly: false,
                current: state.current - 1,
            }
        case actionTypes.SET_SONG_INDEX:
            return {
                ...state,
                randomly: false,
                current: action.payload.index,
            }
        case actionTypes.SET_SONG:
            set_last_played_song(JSON.stringify(action.payload.song))
            return {
                ...state,
                randomly: action.payload.randomly,
                current: action.payload.index,
                data: action.payload.data,
                playlistId: action.payload.playlistId,
            }
        default:
            return state
    }
}

export default MusicPlayerReducer;