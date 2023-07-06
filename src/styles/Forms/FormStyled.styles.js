import { styled } from "styled-components";

// containers
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

// elements
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

export default Form