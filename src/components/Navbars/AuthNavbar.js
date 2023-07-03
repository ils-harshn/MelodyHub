import { useTheme } from "styled-components"
import AuthNavbarStyled from "../../styles/Navbar/AuthNavbar.styles"

const AuthNavbar = () => {
    const theme = useTheme()

    return (
        <AuthNavbarStyled>
            <img src={theme.imgs.logo} alt="" />
        </AuthNavbarStyled>
    )
}

export default AuthNavbar