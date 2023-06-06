import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actionsType from "../../store/actions/types"
import { recentSongsApi } from '../../Api';

export function* handleGetRecentSongsSaga(action) {
    try {
        let data = yield call(recentSongsApi, action.payload.token, action.payload.page);
        yield put({ type: actionsType.GET_RECENT_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_RECENT_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}

export function* getRecentSongsSaga() {
    yield takeEvery(actionsType.INITIATE_RECENT_SONGS, handleGetRecentSongsSaga)
}