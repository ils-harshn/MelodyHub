import { useSelector } from "react-redux"
import Navbar from "../../components/Navbars"

const { Outlet, Navigate } = require("react-router-dom")

const Layout = () => {
    const loginReducerState = useSelector(reducers => reducers.loginReducer)
    if (loginReducerState.user)
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        )
    return <Navigate to={"/login"} />
}

export default Layout