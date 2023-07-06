import { call, put } from "redux-saga/effects";
import { addAlbumErrorAction, addAlbumSuccessAction } from "../../actions/addAlbumActions";
import uploadAPIs from "../../../api/fileUploadAPIs";
import { createAlbumAPI } from "../../../api/adminAPIs";
import { createDownloadLink } from "../../../helpers";

export function* addAlbumHandler(action) {
    try {
        const data1 = yield call(uploadAPIs.ALBUM_300x300, action.payload.token, action.payload.image1, action.payload.callback1)
        const data2 = yield call(uploadAPIs.ALBUM_1200x1200, action.payload.token, action.payload.image2, action.payload.callback2)
        const thumbnail300x300 = createDownloadLink(data1.data.file_id)
        const thumbnail1200x1200 = createDownloadLink(data2.data.file_id)
        const data = yield call(
            createAlbumAPI, 
            action.payload.token, 
            action.payload.code, 
            action.payload.title, 
            action.payload.year, 
            thumbnail300x300, 
            thumbnail1200x1200,
        )
        yield put(addAlbumSuccessAction(data))
    } catch (err) {
        if (err.response && err.response.status === 400) yield put(addAlbumErrorAction("Looks like the data already added."))
        else yield put(addAlbumErrorAction(err.message))
    }
}