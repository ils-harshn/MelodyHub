import { useSelector } from "react-redux"
import AuthNavbar from "../../components/Navbars/AuthNavbar"

const { Outlet, Navigate } = require("react-router-dom")

const Layout = () => {
    const loginReducerState = useSelector(reducers => reducers.loginReducer)
    if (loginReducerState.user)
        return (
            <>
                <Outlet />
            </>
        )
    return <Navigate to={"/login"} />
}

export default Layout