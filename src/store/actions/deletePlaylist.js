import { call, put } from "redux-saga/effects";
import * as actionsType from "../actions/types";
import { deletePlaylistApi } from "../../Api";

export function* deletePlaylist(action) {
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