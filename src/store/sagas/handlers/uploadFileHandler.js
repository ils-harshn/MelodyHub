// import { put, call, take } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import uploadAPIs from '../../../api/fileUploadAPIs';
import { uploadErrorAction, uploadSuccessAction } from '../../actions/uploadActions';
// import { END, eventChannel } from 'redux-saga';
// import { uploadErrorAction, uploadSetProgressAction, uploadSuccessAction } from '../../actions/uploadActions';

// function createUploadEventChannel(action) {
//     return eventChannel((emitter) => {
//         const onUploadProgress = (progressEvent) => {
//             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//             emitter({
//                 progress
//             });
//         };
//         uploadAPIs.TEMP(action.payload.token, action.payload.file, onUploadProgress)
//             .then((response) => {
//                 emitter({
//                     success: response.data
//                 });
//             })
//             .catch((error) => {
//                 emitter({
//                     error,
//                 });
//             });

//         return () => { };
//     });
// }

// export function* uploadFileHandler(action) {
//     try {
//         const channel = yield call(createUploadEventChannel, action);
//         let channelData;
//         while (channelData?.progress != undefined) {
//             channelData = yield take(channel);
//             yield put(uploadSetProgressAction(channelData?.progress));
//         }
//         channelData = yield take(channel);
//         if (channelData?.success) {
//             yield put(uploadSuccessAction(channelData?.success));
//         } else {
//             yield put(uploadErrorAction(channelData?.error));
//         }
//     } catch (error) {
//         yield put(uploadErrorAction(error.message));
//     }
// }

export function* uploadFileHandler(action) {
    try {
        const data = yield call(uploadAPIs.TEMP, action.payload.token, action.payload.file, action.payload.callback)
        yield put(uploadSuccessAction(data))
    } catch(err) {
        yield put(uploadErrorAction(err.message))
    }
}