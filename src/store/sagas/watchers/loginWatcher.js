import { takeLatest } from 'redux-saga/effects'
import { loginHandler } from "../handlers/loginHandler";
import { INITIATE_LOGIN } from '../../actions/types';

export function* loginWatcher() {
    yield takeLatest(INITIATE_LOGIN, loginHandler);
}