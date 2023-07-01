import { useFormik } from "formik"
import LoginFormContainer from "../../styles/Containers/LoginFormContainer.styles"
import { FormError, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import Form, { FormBottom } from "../../styles/Forms/FormStyled.styles"
import { LinkStyled } from "../../styles/Links/Links.styles"
import validationSchema, { initialValues } from "../../formSchemas/loginFormSchema"
import { initiateLoginAction } from "../../store/actions/loginActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginReducerState = useSelector(reducers => reducers.loginReducer)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateLoginAction(values.email, values.password))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    useEffect(() => {
        if (loginReducerState.user) navigate("/")
        formik.setSubmitting(loginReducerState.loading)
        formik.setFieldError("email", loginReducerState.error)
    }, [loginReducerState])

    return (
        <LoginFormContainer>
            <Form onSubmit={formik.handleSubmit}>
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
                <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>
                    { loginReducerState.loading ? 'Loading...': 'Log In' }
                </FormSubmitButton>
                <FormBottom>
                    <p>AR Songs Admin Panel</p>
                    <p>To listen songs go to <LinkStyled to={"https://ils-harshn.github.io/arsongs/"}>AR Songs</LinkStyled></p>
                </FormBottom>
            </Form>
        </LoginFormContainer>
    )
}

export default LoginForm