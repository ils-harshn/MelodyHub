import { takeLatest } from 'redux-saga/effects'
import { searchAlbumHandler } from "../handlers/searchAlbumHandler";
import { INITIATE_SEARCH_ALBUM } from '../../actions/types';

export function* searchAlbumWatcher() {
    yield takeLatest(INITIATE_SEARCH_ALBUM, searchAlbumHandler);
}