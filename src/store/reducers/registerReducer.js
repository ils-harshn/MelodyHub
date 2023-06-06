import * as type from "../actions/types"

const initailState = {
    error: null,
    loading: false,
    success: false,
    email: null,
}

const registerReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.REGISTRATION_STATE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                email: null,
            }
        case type.INITIATE_REGISTRATION:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                email: null,
            }
        case type.REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                email: action.payload.email,
            }
        case type.REGISTRATION_FAILED:
            return {
                loading: false,
                error: action.payload.error,
                success: false,
                email: null,
            }
        default:
            return state;
    }
}

export default registerReducer;