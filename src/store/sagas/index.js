import { all } from "redux-saga/effects"
import { fetchTokenWatcher, verifyTokenWatcher } from "./watchers/loginWatcher"
import { getLikedSongsWatcher } from "./watchers/likedSongsWatcher"
import { getMostViewedSongsWatcher } from "./watchers/mostViewedSongsWatcher"
import { getSearchedSongsWatcher } from "./watchers/searchSongsWatcher"
import { registerWatcher } from "./watchers/registerWatcher"
import { verifyOTPWatcher } from "./watchers/verifyOTPWatcher"
import { createPlaylistWatcher } from "./watchers/createPlaylistWatcher"
import { getRecentSongsWatcher } from "./watchers/recentSongsWatcher"
import { deletePlaylistWatcher } from "./watchers/deletePlaylistWatcher"

export default function* rootSaga() {
  yield all([
    fetchTokenWatcher(),
    verifyTokenWatcher(),
    getLikedSongsWatcher(),
    getMostViewedSongsWatcher(),
    getSearchedSongsWatcher(),
    registerWatcher(),
    verifyOTPWatcher(),
    createPlaylistWatcher(),
    getRecentSongsWatcher(),
    deletePlaylistWatcher(),
  ])
}