import { all } from "redux-saga/effects";
import { loginWatcher } from "./watchers/loginWatcher";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
    ])
  }