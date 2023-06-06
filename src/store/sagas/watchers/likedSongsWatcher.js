import { takeEvery } from 'redux-saga/effects'
import * as actionsType from "../../actions/types"
import { getLikedSongs } from '../../actions/getLikedSongs';

export function* getLikedSongsWatcher() {
    yield takeEvery(actionsType.INITIATE_LIKED_SONGS, getLikedSongs)
}