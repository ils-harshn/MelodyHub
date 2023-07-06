import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/addAlbumFormScehma"
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles"
import { FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormInputNumber, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import { FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles"
import { validateYearOnKeyDown } from "../../helpers/regex"
import { Link } from "react-router-dom"

const AddAlbumForm = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    const handleChange = (e) => {
        let { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    return <FormWhenCentered onSubmit={formik.handleSubmit}>
        <FormTitle>Add Album</FormTitle>
        <FormInputGroup>
            <FormInputLabel>Album Title</FormInputLabel>
            <FormInput type="text" placeholder="Enter Album Title" name="title" onChange={handleChange} value={formik.values.title} />
            <FormError>{formik.touched.title ? formik.errors.title : ""}</FormError>
        </FormInputGroup>
        <FormInputGroup>
            <FormInputLabel>Album Year</FormInputLabel>
            <FormInputNumber placeholder="Enter Album Year" name="year"
                onKeyDown={validateYearOnKeyDown}
                onChange={handleChange}
                value={formik.values.year}
            />
            <FormError>{formik.touched.year ? formik.errors.year : ""}</FormError>
        </FormInputGroup>
        <FormInputGroup>
            <FormInputLabel>Thumbnail Image</FormInputLabel>
            <FormFileInput placeholder="Select Image" accept='image/*' name="file" onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue('file', file);
            }} />
            <FormError>{formik.touched.file ? formik.errors.file : ""}</FormError>
        </FormInputGroup>
        <FormSubmitButton type="submit">
            Submit
        </FormSubmitButton>
    </FormWhenCentered>
}

const AddAlbum = () => {
    return <>
        <CenterElementsContainerWithScaleInEffectEffect>
            <AddAlbumForm />
        </CenterElementsContainerWithScaleInEffectEffect>
        <Link to={"/"}>Home</Link>
    </>
}

export default AddAlbum