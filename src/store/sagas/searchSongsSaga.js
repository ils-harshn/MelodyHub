import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionsType from "../../store/actionsTypes/searchSongsActions"
import { searchSongsApi } from '../../Api';

export function* handleGetSearchedSongsSaga(action) {
    try {
        let data = yield call(
            searchSongsApi, 
            action.payload.token,
            action.payload.original_name,
            action.payload.album__code,
            action.payload.album__title,
            action.payload.artist__name,
            action.payload.year,
            action.payload.genre,
            action.payload.page,
        );
        yield put({ type: actionsType.GET_SEARCHED_SONGS_SUCCESS, payload: { data: data.data } })
    } catch {
        yield put({ type: actionsType.GET_SEARCHED_SONGS_ERROR, payload: { error: "FAILED" } })
    }
}

export function* getSearchedSongsSaga() {
    yield takeLatest(actionsType.INITIATE_SEARCH_SONGS, handleGetSearchedSongsSaga)
}