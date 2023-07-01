import { useSelector } from "react-redux"
import AuthNavbar from "../../components/Navbars/AuthNavbar"

const { Outlet } = require("react-router-dom")

const Layout = () => {
    const loginReducerState = useSelector(reducers => reducers.loginReducer)
    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout