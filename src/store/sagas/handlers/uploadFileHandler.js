import { put, call } from 'redux-saga/effects';
import uploadAPIs from '../../../api/fileUploadAPIs';
import { uploadErrorAction, uploadSetProgressAction, uploadSuccessAction } from '../../actions/uploadActions';

// function* updateProgress(progressEvent) {
//     (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//         console.log("progress", progress)
//         yield put(uploadSetProgressAction(progress))
//     }
// }

function* uploadProgressSaga(progress) {
    yield put(uploadSetProgressAction(progress));
}

export function* uploadFileHandler(action) {
    try {
        const response = yield call(uploadAPIs.TEMP, action.payload.token, action.payload.file, (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            console.log(progress)
            call(uploadProgressSaga, progress);
        });
        // console.log("response.data", response.data)
        yield put(uploadSuccessAction(response.data));
    } catch (error) {
        console.log(error)
        yield put(uploadErrorAction(error.message));
    }
}