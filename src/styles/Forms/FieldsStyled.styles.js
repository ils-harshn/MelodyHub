import { css, styled } from "styled-components";

export const FormInputGroup = styled.div`
    margin-bottom: 10px;
`

export const FormInputLabel = styled.label`
    display: block;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 4px;
`

export const FormInput = styled.input`
    ${({ theme }) => css`
        width: calc(100% - 28px);
        outline: none;
        border: 1px solid ${theme.colors.inputBorder};
        border-radius: 8px;
        padding: 14px;
        background-color: ${theme.colors.inputBackground};
        color: ${theme.colors.inputColor};
        margin-bottom: 4px;
    `}
`

export const FormError = styled.div`
    font-size: 12px;
    color: red;
`

export const FormSubmitButton = styled.button`
    ${({ theme }) => css`
        outline: none;
        border: none;
        padding: 14px;
        font-weight: 600;
        width: 100%;
        font-size: 14px;
        border-radius: 25px;
        background-color: ${theme.colors.buttonPrimaryBackground};
        color: ${theme.colors.inputColor};

        &:disabled {
            background-color: ${theme.colors.buttonPrimaryBackgroundDisabled};
        }
    `}
`