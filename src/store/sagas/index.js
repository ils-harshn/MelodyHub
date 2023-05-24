import { all } from "redux-saga/effects"
import { fetchToken, verifyToken } from "./loginSaga"
import { getLikedSongsSaga } from "./likedSongsSaga"
import { getMostViewedSongsSaga } from "./mostViewedSongsSaga"
import { getSearchedSongsSaga } from "./searchSongsSaga"
import { registerSaga } from "./registerSaga"
import { verifyOTPSaga } from "./verifyOTPSaga"

export default function* rootSaga() {
  yield all([
    fetchToken(),
    verifyToken(),
    getLikedSongsSaga(),
    getMostViewedSongsSaga(),
    getSearchedSongsSaga(),
    registerSaga(),
    verifyOTPSaga(),
  ])
}