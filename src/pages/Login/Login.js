import "./Login.scss";

const Login = () => {
    return <div className="login-page">
        <div className="form-container">
            <form>
                <div className="input-group">
                    <label>Email address or username</label>
                    <input placeholder="Email address or username" type="text" />
                    <div className="error">*Required</div>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input placeholder="Password" type="password" />
                    <div className="error">*Required</div>
                </div>
                <div className="form-error">*Invalid Username or Password</div>
                <div className="forget-password">
                    Forgot your password?
                </div>
                <div className="login-button-with-remember-me">
                    <div className="left">
                        <input type="checkbox" />
                        <label>Remember Me</label>
                    </div>
                    <div className="right">
                        <button type="submit">LOG IN</button>
                    </div>
                </div>
                <div className="form-footer-seperator"></div>
                <div className="form-footer">
                    <div>Don't have an account?</div>
                    <button>SIGN UP FOR FREE</button>
                </div>
            </form>
        </div>
    </div>
}

export default Login;