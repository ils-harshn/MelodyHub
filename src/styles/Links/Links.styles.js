import { Link } from "react-router-dom";
import { css, styled } from "styled-components";

export const LinkStyled = styled(Link)`
    ${({ theme }) => css`
        color: ${theme.colors.LinkColor};

        &:hover {
            color: ${theme.colors.LinkHoverColor};
        }

        &:visited {
            color: ${theme.colors.LinkVisitedColor};
        }
    `}
`