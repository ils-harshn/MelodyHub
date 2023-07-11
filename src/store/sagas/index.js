import { all } from "redux-saga/effects";
import { loginWatcher } from "./watchers/loginWatcher";
import { watchUploadFile } from "./watchers/uploadWatcher";
import { addAlbumWatcher } from "./watchers/addAlbumWatcher";
import { addArtistWatcher } from "./watchers/addArtistWatcher";
import { searchAlbumWatcher } from "./watchers/searchAlbumWatcher";
import { searchArtistWatcher } from "./watchers/searchArtistWatcher";
import { searchGenreWatcher } from "./watchers/searchGenreWatcher";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        watchUploadFile(),
        addAlbumWatcher(),
        addArtistWatcher(),
        searchAlbumWatcher(),
        searchArtistWatcher(),
        searchGenreWatcher(),
    ])
}