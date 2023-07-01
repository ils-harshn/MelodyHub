import { Link } from "react-router-dom"
import LoginFormContainer from "../../styles/Containers/LoginFormContainer.styles"
import { FormError, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import Form, { FormBottom } from "../../styles/Forms/FormStyled.styles"

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
                <FormSubmitButton type="submit" disabled>Log In</FormSubmitButton>

                <FormBottom>
                    <p>AR Songs Admin Panel</p>
                    <p>To listen songs go to <Link to={"https://ils-harshn.github.io/arsongs/"}>AR Songs</Link></p>
                </FormBottom>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm