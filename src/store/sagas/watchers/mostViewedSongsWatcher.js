import { takeEvery } from 'redux-saga/effects'
import * as actionsType from "../../actions/types"
import { getMostViewedSongs } from '../../actions/getMostViewedSongs';

export function* getMostViewedSongsWatcher() {
    yield takeEvery(actionsType.INITIATE_GET_MOST_VIEWED_SONGS, getMostViewedSongs)
}