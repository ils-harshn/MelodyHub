import { all } from "redux-saga/effects";
import { loginWatcher } from "./watchers/loginWatcher";
import { watchUploadFile } from "./watchers/uploadWatcher";
import { addAlbumWatcher } from "./watchers/addAlbumWatcher";
import { addArtistWatcher } from "./watchers/addArtistWatcher";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        watchUploadFile(),
        addAlbumWatcher(),
        addArtistWatcher(),
    ])
}

