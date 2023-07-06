import { styled } from "styled-components";

const Form = styled.form`
    padding: 10px;
`

export const FormWhenCentered = styled.form`
    width: 100%;
    min-width: 240px;
    max-width: 500px;
    padding: 10px;
    margin-top: 30px;
`

export const FormBottom = styled.div`
    text-align: center;
    border-top: 1px solid #dfdfdf;
    margin-top: 20px;
    padding-top: 20px;

    font-size: 13px;
`

export const FormTitle = styled.div`
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
`

export const FormGroupTwoColumn = styled.div`
    display: grid;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    gap: 20px;
`

export default Form