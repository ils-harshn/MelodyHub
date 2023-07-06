import { INITIATE_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../../actions/types";

const initailState = {
    user: {
        "token": "2fcda4f08cef662426bcdc55c9b9adb1199ab014",
        "email": "harsh.narwariya11@gmail.com",
        "first_name": "Harsh",
        "last_name": "Narwariya",
        "is_admin": true,
        "date_joined": "2023-06-16T10:55:04.615595Z",
        "is_active": true
    },
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
