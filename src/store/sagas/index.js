import { all } from "redux-saga/effects"
import { fetchToken, verifyToken } from "./loginSaga"
import { getLikedSongsSaga } from "./likedSongsSaga"
import { getMostViewedSongsSaga } from "./mostViewedSongsSaga"
import { getSearchedSongsSaga } from "./searchSongsSaga"
import { registerSaga } from "./registerSaga"
import { verifyOTPSaga } from "./verifyOTPSaga"
import { createPlaylistSaga } from "./createPlaylistSaga"
import { getRecentSongsSaga } from "./recentSongsSaga"
import { deletePlaylistSaga } from "./deletePlaylistSaga"

export default function* rootSaga() {
  yield all([
    fetchToken(),
    verifyToken(),
    getLikedSongsSaga(),
    getMostViewedSongsSaga(),
    getSearchedSongsSaga(),
    registerSaga(),
    verifyOTPSaga(),
    createPlaylistSaga(),
    getRecentSongsSaga(),
    deletePlaylistSaga(),
  ])
}
