import { call, put, takeLatest } from "redux-saga/effects";
import * as actionsType from "../actionsTypes";
import { registerApi } from "../../Api";

export function* handleRegistrationSaga(action) {
    try {
        yield call(registerApi, action.payload.email, action.payload.password, action.payload.confirmPassword, action.payload.firstName, action.payload.lastName);
        yield put({ type: actionsType.REGISTRATION_SUCCESS, payload: { email: action.payload.email } })
    } catch {
        yield put({ type: actionsType.REGISTRATION_FAILED, payload: {
            error: "*Email or username already exists",
        } })
    }
}

export function* registerSaga() {
    yield takeLatest(actionsType.INITIATE_REGISTRATION, handleRegistrationSaga);
}