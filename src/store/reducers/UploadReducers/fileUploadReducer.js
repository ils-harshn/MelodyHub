import { INITIATE_UPLOAD, SET_UPLOAD_PROGRESS, UPLOAD_FAILURE, UPLOAD_SUCCESS } from "../../actions/types";
const initialState = {
    loading: false,
    uploadResponse: null,
    error: null,
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIATE_UPLOAD:
            return {
                ...initialState,
                loading: true,
            }
        case UPLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                uploadResponse: action.payload.success,
                error: null,
            }
        case UPLOAD_FAILURE:
            return {
                ...state,
                loading: false,
                uploadResponse: null,
                error: action.payload.error,
            }
        default:
            return state
    }
};

export default uploadReducer;
