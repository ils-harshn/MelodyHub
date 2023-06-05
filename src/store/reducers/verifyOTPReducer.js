import * as type from "../actionsTypes/verifyOTPActions.js"

const initailState = {
    error: null,
    loading: false,
    success: false,
}

const verifyOTPReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.RESET_VERIFY_OTP:
            return {
                loading: false,
                error: null,
                success: false,
            }
        case type.INITIATE_VERIFY_OTP:
            return {
                loading: true,
                error: null,
                success: false,
            }
        case type.VERIFY_OTP_SUCCESS:
            return {
                loading: false,
                error: null,
                success: true,
            }
        case type.VERIFY_OTP_FAILED:
            return {
                loading: false,
                error: action.payload.error,
                success: false,
            }
        default:
            return state;
    }
}

export default verifyOTPReducer;