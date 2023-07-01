import { INITIATE_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "./types"

export const initiateLoginAction = (email, password) => {
    return {
        type: INITIATE_LOGIN,
        payload: {
            email,
            password,
        }
    }
}

export const loginSuccessAction = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user,
        }
    }
}

export const loginErrorAction = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error,
        }
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT,
    }
}