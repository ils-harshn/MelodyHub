import { put, call } from 'redux-saga/effects';
import uploadAPIs from '../../../api/fileUploadAPIs';
import { uploadErrorAction, uploadSuccessAction } from '../../actions/uploadActions';

export function* uploadFileHandler(action) {
    try {
        const data = yield call(uploadAPIs.TEMP, action.payload.token, action.payload.file, action.payload.callback)
        yield put(uploadSuccessAction(data))
    } catch(err) {
        yield put(uploadErrorAction(err.message))
    }
}