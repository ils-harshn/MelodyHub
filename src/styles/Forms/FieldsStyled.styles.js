import { styled } from "styled-components";

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
    width: calc(100% - 28px);
    outline: none;
    border: 1px solid #878787;
    border-radius: 8px;
    padding: 14px;
`

export const FormError = styled.div`
    font-size: 12px;
    color: red;
`

export const FormSubmitButton = styled.button`
    outline: none;
    border: none;
    background-color: #1ed760;
    padding: 14px;
    font-weight: 600;
    width: 100%;
    font-size: 14px;
    border-radius: 25px;
`