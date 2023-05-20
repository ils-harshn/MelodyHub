import { Outlet } from "react-router-dom"
import "./Layout.scss"
import Navbar from "../../components/Navbar";
import MusicPlayer from "../../components/MusicPlayer";

const Layout = () => {
    return <div className="layout">
        <div className="container">
            <Navbar />
            <div className="main">
                <Outlet />
            </div>
        </div>
        <MusicPlayer />
    </div>
}

export default Layout;