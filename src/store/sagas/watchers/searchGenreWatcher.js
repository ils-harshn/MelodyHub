import { takeLatest } from 'redux-saga/effects'
import { searchGenreHandler } from "../handlers/searchGenreHandler";
import { INITIATE_SEARCH_GENRE } from '../../actions/types';

export function* searchGenreWatcher() {
    yield takeLatest(INITIATE_SEARCH_GENRE, searchGenreHandler);
}