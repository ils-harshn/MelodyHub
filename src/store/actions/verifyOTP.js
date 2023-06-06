import { call, put } from "redux-saga/effects";
import * as actionsType from "../actions/types";
import { verifyOTPApi } from "../../Api";

export function* verifyOTP(action) {
    try {
        yield call(verifyOTPApi, action.payload.email, action.payload.code);
        yield put({ type: actionsType.VERIFY_OTP_SUCCESS })
    } catch {
        yield put({ type: actionsType.VERIFY_OTP_FAILED, payload: {
            error: "*Provided OTP is wrong or email do not exists.",
        } })
    }
}
