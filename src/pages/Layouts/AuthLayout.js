import { Outlet } from "react-router-dom"
import "./AuthLayout.scss"
import Logo from "../../assets/logo.png";

const AuthLayout = () => {
    return <div className="auth-layout">
        <nav>
            <div className="logo">
                <img src={Logo} alt="image"></img>
            </div>
        </nav>
        <Outlet/>
    </div>
}

export default AuthLayout;