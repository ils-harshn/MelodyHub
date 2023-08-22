import { Outlet } from "react-router-dom"
import { AuthNavbar } from "../components/Navbars/navbars";

export const AuthLayout = () => {
    return <div className="layout">
        <AuthNavbar />
        <Outlet/>
    </div>
}