import { call, put } from "redux-saga/effects";
import { checkGenreNameExistsAPI } from "../../../api/adminAPIs";
import { searchGenreErrorAction, searchGenreSuccessAction } from "../../actions/searchGenreActions";

export function* searchGenreHandler(action) {
    try {
        let data = yield call(checkGenreNameExistsAPI, action.payload.token, action.payload.name);
        yield put(searchGenreSuccessAction(data))
    } catch (err) {
        yield put(searchGenreErrorAction(err.message))
    }
}