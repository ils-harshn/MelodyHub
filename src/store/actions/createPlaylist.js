import { call, put } from "redux-saga/effects";
import { createPlaylistApi } from "../../Api";
import * as actionsType from "./types";


export default function* createPlaylist(action) {
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

