import { Outlet, useNavigate } from "react-router-dom"
import "./Layout.scss"
import Navbar from "../../components/Navbar";
import MusicPlayer from "../../components/MusicPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { INITIATE_LOGIN_WITH_TOKEN } from "../../store/actions/loginActions";
import FullPageLoader from "../../components/FullPageLoader";
import { get_token } from "../../utils";
import CreatePlaylistMainScreen from "../../components/CreatePlaylistMainScreen";

const Layout = () => {
    const data = useSelector((reducers) => reducers.loginReducer);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const check_if_user_logged_in = () => {
        let token = get_token();
        if (data.is_logged_in == false && token) dispatch({ type: INITIATE_LOGIN_WITH_TOKEN, payload: { token } });
        else if (data.loading == false && data.is_logged_in == false) navigate("/accounts/login/")
    }

    useEffect(() => {
        check_if_user_logged_in();
    }, [])
    return <>
        {(data.loading || data.is_logged_in == false) ? <FullPageLoader /> :
            <div className="layout">
                <div className="container">
                    <Navbar />
                    <div className="main">
                        <Outlet />
                    </div>
                </div>
                <MusicPlayer />
            </div>}
    </>
}

export default Layout;