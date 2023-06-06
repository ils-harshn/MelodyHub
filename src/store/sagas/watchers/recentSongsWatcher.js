import { takeEvery } from 'redux-saga/effects'
import * as actionsType from "../../actions/types"
import { getRecentSongs } from '../../actions/getRecentSongs';

export function* getRecentSongsWatcher() {
    yield takeEvery(actionsType.INITIATE_RECENT_SONGS, getRecentSongs)
}