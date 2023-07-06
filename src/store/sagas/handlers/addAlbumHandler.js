import { call, put } from "redux-saga/effects";
import { addAlbumErrorAction, addAlbumSuccessAction } from "../../actions/addAlbumActions";
import uploadAPIs from "../../../api/fileUploadAPIs";

export function* addAlbumHandler(action) {
    try {
        const data1 = yield call(uploadAPIs.ALBUM_300x300, action.payload.token, action.payload.image1, action.payload.callback1)
        const data2 = yield call(uploadAPIs.ALBUM_1200x1200, action.payload.token, action.payload.image2, action.payload.callback2)
        const data = {
            id1: data1.data.file_id,
            id2: data2.data.file_id,
        }
        console.log(data)
        yield put(addAlbumSuccessAction(data))
    } catch (err) {
        yield put(addAlbumErrorAction(err.message))
    }
}