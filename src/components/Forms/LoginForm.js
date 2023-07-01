import { useFormik } from "formik"
import LoginFormContainer from "../../styles/Containers/LoginFormContainer.styles"
import { FormError, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import Form, { FormBottom } from "../../styles/Forms/FormStyled.styles"
import { LinkStyled } from "../../styles/Links/Links.styles"
import validationSchema, { initialValues } from "../../formSchemas/loginFormSchema"

const LoginForm = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            // dispatch(initiateLoginAction(values.email, values.password, values.rememberMe))
            console.log(values)
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    return (
        <LoginFormContainer>
            <Form>
                <FormInputGroup>
                    <FormInputLabel>Admin Email Address</FormInputLabel>
                    <FormInput type="text" name="email" onChange={handleChange} value={formik.values.email} placeholder="Email Address" />
                    <FormError>{formik.touched.email ? formik.errors.email : ""}</FormError>
                </FormInputGroup>
                <FormInputGroup>
                    <FormInputLabel>Password</FormInputLabel>
                    <FormInput name="password" type="password" onChange={handleChange} value={formik.values.password} placeholder="Password" />
                    <FormError>{formik.touched.password ? formik.errors.password : ""}</FormError>
                </FormInputGroup>
                <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>Log In</FormSubmitButton>

                <FormBottom>
                    <p>AR Songs Admin Panel</p>
                    <p>To listen songs go to <LinkStyled to={"https://ils-harshn.github.io/arsongs/"}>AR Songs</LinkStyled></p>
                </FormBottom>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm