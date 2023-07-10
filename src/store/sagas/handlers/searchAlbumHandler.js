import { call, put } from "redux-saga/effects";
import { checkAlbumTitleExistsAPI } from "../../../api/adminAPIs";
import { searchAlbumErrorAction, searchAlbumSuccessAction } from "../../actions/searchAlbumActions";

export function* searchAlbumHandler(action) {
    try {
        let data = yield call(checkAlbumTitleExistsAPI, action.payload.token, action.payload.title);
        yield put(searchAlbumSuccessAction(data))
    } catch (err) {
        yield put(searchAlbumErrorAction(err.message))
    }
}