import { call, put } from 'redux-saga/effects'
import * as actionsType from "../../store/actions/types"
import { recentSongsApi } from '../../Api';

export function* getRecentSongs(action) {
    try {
        let data = yield call(recentSongsApi, action.payload.token, action.payload.page);
        yield put({ type: actionsType.GET_RECENT_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_RECENT_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}
