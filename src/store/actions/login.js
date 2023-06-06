import { getToken, verifyTokenApi } from "../../Api";
import * as actionsType from "../actions/types";
import { call, put } from 'redux-saga/effects'


// handle login
export function* login(action) {
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

// verify token
export function* verifyToken(action) {
    try{
        let data = yield call(verifyTokenApi, action.payload.token);
        yield put({ type: actionsType.LOGIN_SUCCESS, payload: { ...data.data, token: action.payload.token } })
    } catch {
        yield put({ type: actionsType.LOGIN_FAILED, payload: null })
    }
}