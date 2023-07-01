import LoginFormContainer from "../../styles/Containers/LoginFormContainer.styles"
import { FormError, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import Form, { FormBottom } from "../../styles/Forms/FormStyled.styles"
import { LinkStyled } from "../../styles/Links/Links.styles"

const LoginForm = () => {
    return (
        <LoginFormContainer>
            <Form>
                <FormInputGroup>
                    <FormInputLabel>Admin Email Address</FormInputLabel>
                    <FormInput type="text" placeholder="Email Address" />
                    <FormError>*Required</FormError>
                </FormInputGroup>
                <FormInputGroup>
                    <FormInputLabel>Password</FormInputLabel>
                    <FormInput type="password" placeholder="Password" />
                    <FormError>*Required</FormError>
                </FormInputGroup>
                <FormSubmitButton type="submit">Log In</FormSubmitButton>

                <FormBottom>
                    <p>AR Songs Admin Panel</p>
                    <p>To listen songs go to <LinkStyled to={"https://ils-harshn.github.io/arsongs/"}>AR Songs</LinkStyled></p>
                </FormBottom>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm