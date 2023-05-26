import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import NavbarPlaylist from "./NavbarPlaylist";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../store/actions/loginActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={Logo} />
                <div>ar songs</div>
            </div>
            <div className="nav-tabs">
                <div className="top-nav-tabs">
                    <NavLink to={"/"}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                        <div>Home</div>
                    </NavLink>
                    <NavLink to={"/search/"}>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <div>Search</div>
                    </NavLink>
                    <NavLink to={"/library/"}>
                        <span className="material-symbols-outlined">
                            library_add
                        </span>
                        <div>Your Library</div>
                    </NavLink>
                </div>
                <div className="bottom-nav-tabs">
                    <NavLink to={"/createplaylist/"}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        <div>Create Playlist</div>
                    </NavLink>
                    <NavLink to={"/likedsongs/"}>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                        <div>Liked Songs</div>
                    </NavLink>
                </div>
            </div>
            <NavbarPlaylist/>
            <div className="logout-button">
                <button onClick={() => {
                    dispatch({ type:  LOGOUT});
                    navigate("/accounts/login");
                }}>LOG OUT</button>
            </div>
        </div>
    )
}
export default Navbar;