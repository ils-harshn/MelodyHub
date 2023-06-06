import { takeLatest } from 'redux-saga/effects'
import * as actionsType from "../../actions/types"
import { getSearchedSongs } from '../../actions/getSearchSongs';

export function* getSearchedSongsWatcher() {
    yield takeLatest(actionsType.INITIATE_SEARCH_SONGS, getSearchedSongs)
}