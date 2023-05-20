import { getToken, verifyTokenApi } from "../../Api";
import * as actionsType from "../actions/loginActions";
import { call, put, takeLatest } from 'redux-saga/effects'


// handle login
export function* handleLogin(action) {
    try {
        let data = yield call(getToken, action.payload.email, action.payload.password);
        yield put({ type: actionsType.LOGIN_SUCCESS, payload: {
            ...data.data,
            rememberMe: action.payload.rememberMe,
        } })
    } catch {
        yield put({ type: actionsType.LOGIN_FAILED, payload: "*Last Entered Username or password is invalid" })
    }
}

export function* fetchToken() {
    yield takeLatest(actionsType.INITIATE_LOGIN, handleLogin);
}

// verify token
export function* handleVerifyToken(action) {
    try{
        let data = yield call(verifyTokenApi, action.payload.token);
        yield put({ type: actionsType.LOGIN_SUCCESS, payload: { ...data.data, token: action.payload.token } })
    } catch {
        yield put({ type: actionsType.LOGIN_FAILED, payload: null })
    }
}

export function* verifyToken() {
    yield takeLatest(actionsType.INITIATE_LOGIN_WITH_TOKEN, handleVerifyToken);
}