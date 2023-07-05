import { takeLatest } from 'redux-saga/effects';
import { INITIATE_UPLOAD } from '../../actions/types';
import { uploadFileHandler } from '../handlers/uploadFileHandler';


export function* watchUploadFile() {
    yield takeLatest(INITIATE_UPLOAD, uploadFileHandler);
}
