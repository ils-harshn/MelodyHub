import { call, put, takeLatest } from "redux-saga/effects";
import * as actionsType from "../actions/deletePlaylistReducerActions";
import { deletePlaylistApi } from "../../Api";

export function* handleDeletePlaylistSaga(action) {
    try {
        yield call(deletePlaylistApi, action.payload.token, action.payload.id);
        yield put({
            type: actionsType.DELETE_PLAYLIST_SUCCESS, payload: {
                success: "*Deleted Playlist",
            }
        })
    } catch {
        yield put({
            type: actionsType.DELETE_PLAYLIST_ERROR, payload: {
                error: "*No playlist exists with the given id.",
            }
        })
    }
}

export function* deletePlaylistSaga() {
    yield takeLatest(actionsType.INITIATE_DELETE_PLAYLIST, handleDeletePlaylistSaga);
}