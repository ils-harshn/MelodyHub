import * as Yup from "yup"
import { EMAIL_REGEX, } from "../helpers/regex";

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .matches(EMAIL_REGEX, 'Invalid email address'),
    password: Yup.string()
        .required('Password is required'),
});

export const initialValues = {
    email: '',
    password: '',
}

export default validationSchema