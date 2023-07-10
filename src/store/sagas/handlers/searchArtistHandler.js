import { call, put } from "redux-saga/effects";
import { checkArtistNameExistsAPI } from "../../../api/adminAPIs";
import { searchArtistErrorAction, searchArtistSuccessAction } from "../../actions/searchArtistActions";

export function* searchArtistHandler(action) {
    try {
        let data = yield call(checkArtistNameExistsAPI, action.payload.token, action.payload.title);
        yield put(searchArtistSuccessAction(data))
    } catch (err) {
        yield put(searchArtistErrorAction(err.message))
    }
}