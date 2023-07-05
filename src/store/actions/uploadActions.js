import { INITIATE_UPLOAD, SET_UPLOAD_PROGRESS, UPLOAD_FAILURE, UPLOAD_SUCCESS } from "./types"

export const initiateUploadAction = (token, file) => {
    return {
        type: INITIATE_UPLOAD,
        payload: {
            token,
            file,
        }
    }
}

export const uploadSuccessAction = (success) => {
    return {
        type: UPLOAD_SUCCESS,
        payload: {
            success,
        }
    }
}

export const uploadErrorAction = (error) => {
    return {
        type: UPLOAD_FAILURE,
        payload: {
            error,
        }
    }
}

export const uploadSetProgressAction = (value) => {
    return {
        type: SET_UPLOAD_PROGRESS,
        payload: {
            value,
        }
    }
}