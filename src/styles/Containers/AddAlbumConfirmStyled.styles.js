import { css, styled } from "styled-components";
import { StatusInEffect } from "../AnimationContainers/AnimationContainers.styles";

const AddAlbumConfirmStyled = styled.div`
    ${({ theme }) => css`
        animation: ${StatusInEffect} 300ms ease;
        div.preview-container {
            width: 100%;
            min-width: 240px;
            max-width: 500px;
            margin-top: 30px;
        }

        div.image-preview {
            img {
                margin-top: 4px;
                margin-bottom: 8px;
                box-shadow: ${theme.shadows.background};
                border-radius: 8px;
                min-width: 240px;
                max-width: 300px;
                width: 100%;
                aspect-ratio: 1 / 1;
                object-fit: cover;
            }
            text-align: center;
        }

        div.status {
            p {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                animation: ${StatusInEffect} 300ms ease;
                margin-bottom: 10px;
            }
        }

        div.status-error {
            p {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                color: red;
                animation: ${StatusInEffect} 300ms ease;
                margin-bottom: 10px;
            }
        }
    `}
`

export default AddAlbumConfirmStyled