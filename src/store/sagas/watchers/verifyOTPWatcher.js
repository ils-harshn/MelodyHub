import { takeLatest } from "redux-saga/effects";
import * as actionsType from "../../actions/types";
import { verifyOTP } from "../../actions/verifyOTP";

export function* verifyOTPWatcher() {
    yield takeLatest(actionsType.INITIATE_VERIFY_OTP, verifyOTP);
}