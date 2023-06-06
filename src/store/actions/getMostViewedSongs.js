import { call, put } from 'redux-saga/effects'
import * as actionsType from "../../store/actions/types"
import { getMostViewedSongsApi } from '../../Api';

export function* getMostViewedSongs(action) {
    try {
        let data = yield call(getMostViewedSongsApi, action.payload.token);
        yield put({ type: actionsType.GET_MOST_VIEWED_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_MOST_VIEWED_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}