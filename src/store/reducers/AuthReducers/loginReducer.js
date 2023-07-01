import { INITIATE_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../../actions/types";

const initailState = {
    user: null,
    error: null,
    loading: false,
}

const loginReducer = (state = initailState, action) => {
    switch (action.type) {
        case INITIATE_LOGIN:
            return {
                ...initailState,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...initailState,
                user: action.payload.user,
            }
        case LOGIN_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        case LOGOUT:
            return initailState
        default:
            return state;
    }
}

export default loginReducer;