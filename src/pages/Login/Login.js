import { useEffect, useState } from "react";
import "./Login.scss";
import { get_token, set_and_validate_field } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actionsTypes/loginActions"
import { REGISTRATION_STATE_RESET } from "../../store/actionsTypes/registerActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate()

    const data = useSelector((reducers) => reducers.loginReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.INITIATE_LOGIN, payload: {
                email,
                password,
                rememberMe,
            }
        })
    }

    const check_if_user_logged_in = () => {
        let token = get_token();
        if (data.is_logged_in == false && token) dispatch({ type: actionTypes.INITIATE_LOGIN_WITH_TOKEN, payload: { token } });
        else if (data.loading == false && data.is_logged_in == false) navigate("/accounts/login/")
    }

    useEffect(() => {
        check_if_user_logged_in();
    }, [])

    useEffect(() => {
        if (data.is_logged_in) navigate("/");
    }, [data])

    return <div className="login-page">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email address</label>
                    <input placeholder="Email address" value={email} onChange={(e) => set_and_validate_field(e.target.value, setEmail, setEmailError, "email")} />
                    <div className="error">{emailError && emailError}</div>
                </div>
                <div className="input-group">
                    <label>Enter Password</label>
                    <input placeholder="Password" value={password} type="password" onChange={(e) => set_and_validate_field(e.target.value, setPassword, setPasswordError, "*")} />
                    <div className="error">{passwordError && passwordError}</div>
                </div>
                <div className="form-error">{data.error}</div>
                <div className="forget-password">
                    Forgot your password?
                </div>
                <div className="login-button-with-remember-me">
                    <div className="left">
                        <input type="checkbox" value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label>Remember Me</label>
                    </div>
                    <div className="right">
                        <button type="submit" disabled={emailError || passwordError || data.loading}>LOG IN</button>
                    </div>
                </div>
                <div className="form-footer-seperator"></div>
                <div className="form-footer">
                    <div>Don't have an account?</div>
                    <button onClick={() => {
                        dispatch({ type: REGISTRATION_STATE_RESET })
                        navigate("/accounts/register/")
                    }}>SIGN UP FOR FREE</button>
                </div>
            </form>
        </div>
    </div>
}

export default Login;