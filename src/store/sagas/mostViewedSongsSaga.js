import { call, put, takeEvery } from 'redux-saga/effects'
import * as actionsType from "../../store/actionsTypes"
import { getMostViewedSongsApi } from '../../Api';

export function* handleMostViewedSongsSaga(action) {
    try {
        let data = yield call(getMostViewedSongsApi, action.payload.token);
        yield put({ type: actionsType.GET_MOST_VIEWED_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_MOST_VIEWED_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}

export function* getMostViewedSongsSaga() {
    yield takeEvery(actionsType.INITIATE_GET_MOST_VIEWED_SONGS, handleMostViewedSongsSaga)
}