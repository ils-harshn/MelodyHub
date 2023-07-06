import { css, styled } from "styled-components";

export const Loader = styled.div`
    ${({ theme }) => css`
        border: 4px solid ${theme.colors.bodyColor};
        border-radius: 50%;
        border-top: 4px solid ${theme.colors.buttonPrimaryBackground};
        width: 24px;
        height: 24px;
        -webkit-animation: spin 300ms linear infinite;
        animation: spin 300ms linear infinite;

        @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `}
`

export const LoaderInScreenCenter = styled.div`
    height: calc(100vh - 120px);
    display: flex;
    justify-content: center;
    align-items: center;
`