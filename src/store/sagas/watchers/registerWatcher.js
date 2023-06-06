import { takeLatest } from "redux-saga/effects";
import * as actionsType from "../../actions/types";
import { register } from "../../actions/register";

export function* registerWatcher() {
    yield takeLatest(actionsType.INITIATE_REGISTRATION, register);
}