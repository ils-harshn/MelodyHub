import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { set_and_validate_field } from "../../utils";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(true);

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(true);

    const navigate = useNavigate()

    return <div className="register-page">
        <div className="form-container">
            <form>
                <div className="input-group">
                    <label>Email address</label>
                    <input placeholder="Email address" value={email} onChange={(e) => set_and_validate_field(e.target.value, setEmail, setEmailError, "email")} />
                    <div className="error">{emailError && emailError}</div>
                </div>
                <div className="input-group">
                    <label>First Name</label>
                    <input placeholder="First Name" value={firstName} type="text" onChange={(e) => set_and_validate_field(e.target.value, setFirstName, setFirstNameError, "*")} />
                    <div className="error">{ firstNameError && firstNameError }</div>
                </div>
                <div className="input-group">
                    <label>Last Name</label>
                    <input placeholder="Last Name" value={lastName} type="text" onChange={(e) => set_and_validate_field(e.target.value, setLastName, setLastNameError, "*")}  />
                    <div className="error">{ lastNameError && lastNameError }</div>
                </div>
                <div className="input-group">
                    <label>Enter Password</label>
                    <input placeholder="Password" value={password} type="password" onChange={(e) => {
                        let { is_valid } = set_and_validate_field(e.target.value, setPassword, setPasswordError, "password")
                        if (is_valid && (e.target.value == confirmPassword)) {
                            setPasswordError(false)
                            setConfirmPasswordError(false)
                        } else {
                            if (is_valid && confirmPasswordError == false) setPasswordError("*Password Not Matching")
                            if (confirmPasswordError == false) setConfirmPasswordError("*Password Not Matching")
                        }
                    }} />
                    <div className="error">{passwordError && passwordError}</div>
                </div>
                <div className="input-group">
                    <label>Enter Confirm Password</label>
                    <input placeholder="Confirm Password" value={confirmPassword} type="password" onChange={(e) => {
                        let { is_valid } = set_and_validate_field(e.target.value, setConfirmPassword, setConfirmPasswordError, "*")
                        console.log(e.target.value, password)
                        if (is_valid && (e.target.value == password)) {
                            setConfirmPasswordError(false)
                            setPasswordError(false)
                        } else {
                            if (is_valid) setConfirmPasswordError("*Password Not Matching")
                            if (passwordError == false) setPasswordError(true)
                        }
                    }} />
                    <div className="error">{confirmPasswordError && confirmPasswordError}</div>
                </div>
                <div className="form-error">*Email or username already exists</div>
                <button type="submit" disabled={emailError || firstNameError || lastNameError || passwordError || confirmPasswordError}>Register</button>
                <div className="form-footer-seperator"></div>
                <div className="form-footer">
                    <div>Already have an account?</div>
                    <button >LOGIN HERE</button>
                </div>
            </form>
        </div>
    </div>
}

export default Register;