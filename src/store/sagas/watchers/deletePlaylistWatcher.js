import { takeLatest } from "redux-saga/effects";
import * as actionsType from "../../actions/types";
import { deletePlaylist } from "../../actions/deletePlaylist";

export function* deletePlaylistWatcher() {
    yield takeLatest(actionsType.INITIATE_DELETE_PLAYLIST, deletePlaylist);
}