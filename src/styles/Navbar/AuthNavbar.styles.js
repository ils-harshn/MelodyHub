import { css, styled } from "styled-components";

const AuthNavbarStyled = styled.nav`
    ${({ theme }) => css`
        background-color: ${theme.colors.navbarBackground};
        height: 90px;
        border-bottom: 1px solid ${theme.colors.navbarBorderBottom};


        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 65px;
            aspect-ratio: 1 / 1;
        }
    `}
`

export default AuthNavbarStyled