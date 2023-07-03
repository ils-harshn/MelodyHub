import { useTheme } from "styled-components";
import NavbarStyled from "../../styles/Navbar/Navbar.styles";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions/loginActions";

const Navbar = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const loginReducerState = useSelector(reducers => reducers.loginReducer)

    return (
        <NavbarStyled>
            <span className="material-symbols-outlined">
                menu
            </span>
            <div className="drop-down">
                <ul>
                    <li><NavLink to={"/"}>HOME</NavLink></li>
                    <li><NavLink to={"/analyze"}>ANALYZE</NavLink></li>
                    <li><Link to={"/"}>AR SONGS</Link></li>
                    <li><Link onClick={() => dispatch(logoutAction())}>LOG OUT</Link></li>
                </ul>
            </div>
            <div className="logo-container">
                <img src={theme.imgs.logo} alt="" />
                <p>Admin Panel</p>
            </div>
            <div className="username lg">
                <p>{loginReducerState.user.email}</p>
            </div>

            <div className="username sm">
                <p>{loginReducerState.user.email[0]}</p>
            </div>
        </NavbarStyled>
    )
}

export default Navbar;