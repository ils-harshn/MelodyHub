import { useEffect, useState } from "react";
import "./VerifyOTP.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { INITIATE_VERIFY_OTP } from "../../store/actions/verifyOTPActions";

const VerifyOTP = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const email = useSelector((reducers) => reducers.registerReducer.email);
    const data = useSelector((reducers) => reducers.verifyOTPReducer);
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: INITIATE_VERIFY_OTP, payload: {
            email,
            code,
        }});
    }

    useEffect(() => {
        if (email == null) navigate("/accounts/register/");
    }, [])

    useEffect(() => {
        if (data.success) navigate("/accounts/login/");
    }, [data])

    return <div className="otp-page">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email address</label>
                    <input placeholder="Email address" value={email} disabled/>
                </div>
                <div className="input-group">
                    <label>OTP</label>
                    <input placeholder="Enter OTP" value={code} type="number" min={100000} max={999999} onChange={(e) => {
                        setCode(e.target.value)
                        if (e.target.value.length && e.target.value.length == 6) setCodeError(false)
                        else setCodeError("*6 digit OTP is required.")
                    }}/>
                    <div className="error"></div>
                </div>
                <div className="form-error">{ data.error }</div>
                <button type="submit" disabled={codeError || data.loading}>Verify</button>
            </form>
        </div>
    </div>
}

export default VerifyOTP;