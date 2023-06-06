import { call, put } from 'redux-saga/effects'
import * as actionsType from "../../store/actions/types"
import { getLikedSongsApi } from '../../Api';

export function* getLikedSongs(action) {
    try {
        let data = yield call(getLikedSongsApi, action.payload.token, action.payload.page);
        yield put({ type: actionsType.GET_LIKED_SONGS_SUCCESS, payload: {data: data.data} })
    } catch {
        yield put({ type: actionsType.GET_LIKED_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}