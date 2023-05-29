import { call, put, takeLatest } from "redux-saga/effects";
import * as actionsType from "../actions/createPlaylistReducerActions";
import { createPlaylistApi } from "../../Api";

export function* handleCreatePlaylistSaga(action) {
    try {
        yield call(createPlaylistApi, action.payload.token, action.payload.title);
        yield put({
            type: actionsType.CREATE_PLAYLIST_SUCCESS, payload: {
                success: "*Created Playlist",
            }
        })
    } catch {
        yield put({
            type: actionsType.CREATE_PLAYLIST_ERROR, payload: {
                error: "*Playlist with this name already exists.",
            }
        })
    }
}

export function* createPlaylistSaga() {
    yield takeLatest(actionsType.INITIATE_CREATE_PLAYLIST, handleCreatePlaylistSaga);
}