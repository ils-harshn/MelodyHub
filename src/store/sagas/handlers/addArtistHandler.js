import { call, put } from "redux-saga/effects";
import uploadAPIs from "../../../api/fileUploadAPIs";
import { createArtistAPI } from "../../../api/adminAPIs";
import { createDownloadLink } from "../../../helpers";
import { addArtistErrorAction, addArtistSuccessAction } from "../../actions/addArtistActions";

export function* addArtistHandler(action) {
    try {
        const data1 = yield call(uploadAPIs.ARTIST_300x300, action.payload.token, action.payload.image1, action.payload.callback1)
        const data2 = yield call(uploadAPIs.ARTIST_1200x1200, action.payload.token, action.payload.image2, action.payload.callback2)
        const thumbnail300x300 = createDownloadLink(data1.data.file_id)
        const thumbnail1200x1200 = createDownloadLink(data2.data.file_id)
        const data = yield call(
            createArtistAPI, 
            action.payload.token, 
            action.payload.name, 
            thumbnail300x300, 
            thumbnail1200x1200,
            data1.data.github_download_url,
            data2.data.github_download_url,
        )
        yield put(addArtistSuccessAction(data))
    } catch (err) {
        if (err.response && err.response.status === 400) yield put(addArtistErrorAction("Looks like the data already added."))
        else yield put(addArtistErrorAction(err.message))
    }
}