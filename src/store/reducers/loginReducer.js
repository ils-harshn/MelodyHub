import { set_token, remove_token } from "../../utils"
import * as type from "../actions/loginActions.js"

const initailState = {
    user: null,
    is_logged_in: false,
    error: null,
    loading: false,
}

const loginReducer = (state = initailState, action) => {
    switch (action.type) {
        case type.INITIATE_LOGIN_WITH_TOKEN:
            return {
                ...state,
                loading: true,
                is_logged_in: false,
                error: null,
                user: null,
            }
        case type.INITIATE_LOGIN:
            return {
                ...state,
                loading: true,
                is_logged_in: false,
                error: null,
                user: null,
            }
        case type.LOGIN_SUCCESS:
            if (action.payload.rememberMe != undefined) {
                set_token(action.payload.token, action.payload.rememberMe)
            } 
            return {
                ...state,
                loading: false,
                user: action.payload,
                is_logged_in: true,
                error: null,
            }
        case type.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                is_logged_in: false,
                user: null,
            }

        case type.LOGOUT:
            remove_token()
            return {
                ...state,
                user: null,
                is_logged_in: false,
                error: null,
                loading: false,
            }
        default:
            return state;
    }
}

export default loginReducer;