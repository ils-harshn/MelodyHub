import { call, put } from "redux-saga/effects";
import { addAlbumErrorAction, addAlbumSuccessAction } from "../../actions/addAlbumActions";
import uploadAPIs from "../../../api/fileUploadAPIs";

export function* addAlbumHandler(action) {
    try {
        const data = yield call(uploadAPIs.TEMP, action.payload.token, action.payload.file, action.payload.callback)
        yield put(addAlbumSuccessAction(data))
    } catch (err) {
        yield put(addAlbumErrorAction(err.message))   
    }
}