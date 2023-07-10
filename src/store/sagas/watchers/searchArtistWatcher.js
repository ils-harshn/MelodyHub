import { takeLatest } from 'redux-saga/effects'
import { searchArtistHandler } from "../handlers/searchArtistHandler";
import { INITIATE_SEARCH_ARTIST } from '../../actions/types';


export function* searchArtistWatcher() {
    yield takeLatest(INITIATE_SEARCH_ARTIST, searchArtistHandler);
}