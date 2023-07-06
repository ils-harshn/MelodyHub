import { takeLatest } from 'redux-saga/effects'
import { addAlbumHandler } from "../handlers/addAlbumHandler";
import { INITIATE_ADD_ALBUM } from '../../actions/types';

export function* addAlbumWatcher() {
    yield takeLatest(INITIATE_ADD_ALBUM, addAlbumHandler);
}