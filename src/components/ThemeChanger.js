import { css, styled } from "styled-components"

const ThemeChangerStyled = styled.div`
    ${({ theme }) => css`
        cursor: pointer;
        position: absolute;
        z-index: 1000;
        right: 0;
        padding: 10px;

        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        span {
            padding: 12px;
            border-radius: 50%;
            background-color: ${theme.colors.themeChangerBackground};
        }
    `}
`

const ThemeChanger = ({ toggleTheme, currentTheme }) => {
    return (
        <ThemeChangerStyled onClick={toggleTheme}>
            <span className="material-symbols-outlined">
                {currentTheme === "light" ? "dark_mode" : "light_mode"}
            </span>
        </ThemeChangerStyled>
    )
}

export default ThemeChanger