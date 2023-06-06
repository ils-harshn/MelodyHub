import { login, verifyToken } from "../../actions/login";
import * as actionsType from "../../actions/types";
import { takeLatest } from 'redux-saga/effects'

export function* fetchTokenWatcher() {
    yield takeLatest(actionsType.INITIATE_LOGIN, login);
}

export function* verifyTokenWatcher() {
    yield takeLatest(actionsType.INITIATE_LOGIN_WITH_TOKEN, verifyToken);
}