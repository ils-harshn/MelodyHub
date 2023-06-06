import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actionsType from "../../store/actions/types"
import { getLikedSongsApi } from '../../Api';

export function* handleGetLikedSongsSaga(action) {
    try {
        let data = yield call(getLikedSongsApi, action.payload.token, action.payload.page);
        yield put({ type: actionsType.GET_LIKED_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_LIKED_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}

export function* getLikedSongsSaga() {
    yield takeEvery(actionsType.INITIATE_LIKED_SONGS, handleGetLikedSongsSaga)
}