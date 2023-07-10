import { takeLatest } from 'redux-saga/effects'
import { addArtistHandler } from "../handlers/addArtistHandler";
import { INITIATE_ADD_ARTIST } from '../../actions/types';

export function* addArtistWatcher() {
    yield takeLatest(INITIATE_ADD_ARTIST, addArtistHandler);
}