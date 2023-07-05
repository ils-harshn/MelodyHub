import { INITIATE_UPLOAD, SET_UPLOAD_PROGRESS, UPLOAD_FAILURE, UPLOAD_SUCCESS } from "../../actions/types";

// reducer.js
const initialState = {
    loading: false,
    uploadProgress: 0,
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
        case SET_UPLOAD_PROGRESS:
            console.log("Reducer Progress", action.payload.value)
            return {
                ...state,
                uploadProgress: action.payload.value,
              } 
        case UPLOAD_SUCCESS:
            console.log("response.data", action.payload.success)
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
