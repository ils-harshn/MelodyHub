import { all } from "redux-saga/effects";
import { loginWatcher } from "./watchers/loginWatcher";
import { watchUploadFile } from "./watchers/uploadWatcher";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        watchUploadFile(),
    ])
}
