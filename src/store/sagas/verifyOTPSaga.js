import { call, put, takeLatest } from "redux-saga/effects";
import * as actionsType from "../actionsTypes/verifyOTPActions";
import { verifyOTPApi } from "../../Api";

export function* handleVerifyOTPSaga(action) {
    try {
        yield call(verifyOTPApi, action.payload.email, action.payload.code);
        yield put({ type: actionsType.VERIFY_OTP_SUCCESS })
    } catch {
        yield put({ type: actionsType.VERIFY_OTP_FAILED, payload: {
            error: "*Provided OTP is wrong or email do not exists.",
        } })
    }
}

export function* verifyOTPSaga() {
    yield takeLatest(actionsType.INITIATE_VERIFY_OTP, handleVerifyOTPSaga);
}