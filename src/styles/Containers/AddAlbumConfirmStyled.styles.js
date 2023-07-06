import { css, styled } from "styled-components";

const AddAlbumConfirmStyled = styled.div`
    ${({ theme }) => css`
        .preview-container {
            width: 100%;
            min-width: 240px;
            max-width: 500px;
            padding: 10px;
            margin-top: 30px;
        }

        .image-preview {
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
                /* height: 300px; */
            }
            text-align: center;
        }
    `}
`

export default AddAlbumConfirmStyled