import { call, put } from "redux-saga/effects";
import { loginUserApi } from "../../../api/authAPIs";
import { loginErrorAction, loginSuccessAction } from "../../actions/loginActions";

export function* loginHandler(action) {
    try {
        let data = yield call(loginUserApi, action.payload.email, action.payload.password);
        if (data.data.is_admin === false) throw Error("This is not an admin account.")
        yield put(loginSuccessAction(data.data))
    } catch (err) {
        if (err.response && err.response.status === 400) yield put(loginErrorAction("Email or password is invalid."))
        else yield put(loginErrorAction(err.message))
    }
}
