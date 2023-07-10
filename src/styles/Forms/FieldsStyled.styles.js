import { css, styled } from "styled-components";
import { StatusInEffect } from "../AnimationContainers/AnimationContainers.styles";

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
        margin-bottom: 2px;
    `}
`

export const FormInputNumber = styled(FormInput).attrs({ type: 'number' })`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
    -moz-appearance: textfield;
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

export const FormCancelButton = styled(FormSubmitButton)`
    ${({ theme }) => css`
        background-color: ${theme.colors.buttonDangerBackground};
        color: ${theme.colors.inputColor};

        &:disabled {
            background-color: ${theme.colors.buttonDangerBackgroundDisabled};
        }
    `}
`

export const FormFileInput = styled.input.attrs({ type: 'file' })`
    ${({ theme, placeholder }) => css`
        margin-top: 2px;
        margin-bottom: 2px;
        &::-webkit-file-upload-button {
            display: none;
        }
        &::before {
            content: "${placeholder}";
            display: inline-block;
            background: ${theme.colors.inputFileBackground};
            border: 1px solid ${theme.colors.inputFileBorder};
            border-radius: 3px;
            padding: 5px 8px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 10pt;
            margin-right: 4px;
        }
        &:hover::before {
            border-color: ${theme.colors.inputFileBorderHover};
        }
        &:active::before {
            background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
        }
    `}
`

export const Selector = styled.div`
    border-radius: 8px;
    overflow: hidden;
    animation: ${StatusInEffect} 300ms ease;
`

export const SelectItem = styled.div`
    ${({ theme }) => css`
        background-color: ${theme.colors.selectorBackground};
        padding: 8px;
        
        &:hover {
            background-color: ${theme.colors.selectorHoverBackground};
            color: ${theme.colors.selectorHoverColor};
        }

        transition: background-color 300ms ease-in, color 300ms ease-in;
    `}

`