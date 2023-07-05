import { put, call, take } from 'redux-saga/effects';
import uploadAPIs from '../../../api/fileUploadAPIs';
import { uploadErrorAction, uploadSetProgressAction, uploadSuccessAction } from '../../actions/uploadActions';
import { END, eventChannel } from 'redux-saga';

function createUploadEventChannel(action) {
    return eventChannel((emitter) => {
        const onUploadProgress = (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            emitter(progress);
        };
        uploadAPIs.TEMP(action.payload.token, action.payload.file, onUploadProgress)
            .then((response) => {
                // Notify the event channel about the successful upload
                emitter(response.data);
                emitter(END); // Close the event channel
            })
            .catch((error) => {
                // Notify the event channel about the upload failure
                emitter(error);
                emitter(END); // Close the event channel
            });

        // Return the unsubscribe function for cleanup
        return () => { };
    });
}

export function* uploadFileHandler(action) {
    try {
        const channel = yield call(createUploadEventChannel, action);
        let progress = 0
        while (progress != 100) {
            progress = yield take(channel);
            yield put(uploadSetProgressAction(progress));
        }
        const data = yield take(channel);
        yield put(uploadSuccessAction(data));
    } catch (error) {
        yield put(uploadErrorAction(error.message));
    }
}