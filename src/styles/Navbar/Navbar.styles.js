import { css, styled } from "styled-components";

const NavbarStyled = styled.nav`
    ${({ theme }) => css`
        background-color: ${theme.colors.navbarBackground};
        height: 90px;
        border-bottom: 1px solid ${theme.colors.navbarBorderBottom};

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        div.logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        div.logo-container {
            img {
                height: 65px;
                aspect-ratio: 1 / 1;
            }
        }

        span {
            position: absolute;
            left: 14px;
            cursor: pointer;
            
            &:hover {
                ~ div.drop-down {
                    display: block;
                }
            }
        }

        div.username {
            position: absolute;
            right: 4px;
            cursor: pointer;
            background-color: ${theme.colors.themeChangerBackground};
            transition: background-color 200ms ease-in, color 200ms ease-in;

            &:hover {
                color: ${theme.colors.onHoverColor};
                background-color: ${theme.colors.onHoverBackground};
            }
        }

        div.username.lg {
            width: fit-content;
            max-width: 140px;
            padding: 10px 18px 10px 18px;
            border-radius: 25px;
            font-size: 14px;
            
            p {
                overflow: hidden;
                text-overflow: ellipsis;
            } 
            
            @media screen and (max-width: 501px) {
                display: none;
            }
        }

        div.username.sm {
            width: 50px;
            height: 50px;
            padding: 0;
            display: none;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            font-size: 22px;
            overflow: hidden;
            border-radius: 25px;

            @media screen and (max-width: 501px) {
                display: flex;

            }
        }

        div.drop-down {
            cursor: pointer;
            position: absolute;
            left: 14px;
            top: 52px;
            min-width: 160px;
            width: 20%;
            max-width: 500px;
            display: none;
            border-radius: 8px;
            font-size: 13px;
            background-color: ${theme.colors.dropDownBackground};
            box-shadow: ${theme.shadows.background};
            overflow: hidden;

            &:hover {
                display: block;
            }

            ul {
                margin: 0;
                list-style: none;

                li {                    
                    a {
                        display: block;
                        padding: 10px 10px 10px 18px;
                        color: ${theme.colors.bodyColor};
                        text-decoration: none;

                        transition: color 200ms ease-in;
                        transition: background-color 200ms ease-in;
                        
                        
                        &:hover {
                            color: ${theme.colors.onHoverColor};
                            background-color: ${theme.colors.onHoverBackground};
                        }

                        &.active {
                            color: ${theme.colors.LinkVisitedColor};
                            font-weight: 600;
                            
                            &:hover {
                                background-color: ${theme.colors.dropDownBackground};
                            }
                        }
                    }
                }
            }
        }
    `}
`

export default NavbarStyled