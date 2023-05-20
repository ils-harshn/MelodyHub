import { all } from "redux-saga/effects"
import { fetchToken, verifyToken } from "./loginSaga"

export default function* rootSaga() {
    yield all([
      fetchToken(),
      verifyToken(),
    ])
  }
  