import { takeLatest } from "redux-saga/effects";
import * as actionsType from "../actions/types";
import createPlaylist from "../actions/createPlaylist";


export function* createPlaylistSaga() {
    yield takeLatest(actionsType.INITIATE_CREATE_PLAYLIST, createPlaylist);
}