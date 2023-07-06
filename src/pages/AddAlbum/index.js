import { Form, useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/addAlbumFormScehma"
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles"
import { FormCancelButton, FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormInputNumber, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import { FormGroupTwoColumn, FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles"
import { validateYearOnKeyDown } from "../../helpers/regex"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { initiateAddAlbumAction } from "../../store/actions/addAlbumActions"
import { useEffect, useState } from "react"
import { resizeImage } from "../../helpers/imageResizers"
import AddAlbumConfirmStyled from "../../styles/Containers/AddAlbumConfirmStyled.styles"
import { Loader, LoaderInScreenCenter } from "../../styles/Loaders/Loaders.styles"

const ConfirmAddAlbumForm = ({ data, setOpenConfirmation }) => {
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const dispatch = useDispatch()
    const [resizing, setResizing] = useState(true)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image1Progress, setImage1Progress] = useState(0)
    const [image2Progress, setImage2Progress] = useState(0)

    const resizeImages = async () => {
        const resizedimage1 = await resizeImage(data.file, data.title, 300, 300)
        const resizedimage2 = await resizeImage(data.file, data.title, 1200, 1200)
        setImage1(resizedimage1)
        setImage2(resizedimage2)
        setResizing(false)
    }

    useEffect(() => {
        resizeImages()
    }, [])

    if (resizing) {
        return <LoaderInScreenCenter>
            <Loader />
        </LoaderInScreenCenter>
    }

    // return <div>
    {/* <div>{data.title}</div>
        <div>{data.year}</div>
        <img src={URL.createObjectURL(image1)} width={300} height={300} />
        <img src={URL.createObjectURL(image1)} width={600} height={600} />
        <button onClick={() => dispatch(initiateAddAlbumAction(token, data.album, data.year, image1, (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImage1Progress(progress)
        }))}>Confirm</button>
        <button onClick={() => setOpenConfirmation(false)}>Back</button> */}
    // </div>
    return <AddAlbumConfirmStyled>
        <div className="preview-container">
            <FormInputGroup>
                <FormInputLabel>Album Title</FormInputLabel>
                <FormInput value={data.title} disabled />
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Album Year</FormInputLabel>
                <FormInput value={data.year} disabled />
            </FormInputGroup>
            <div className="image-preview">
                <img src={URL.createObjectURL(image1)} />
            </div>
            <FormGroupTwoColumn>
                <FormSubmitButton>Confirm</FormSubmitButton>
                <FormCancelButton onClick={() => setOpenConfirmation(false)}>Back</FormCancelButton>
            </FormGroupTwoColumn>
        </div>
    </AddAlbumConfirmStyled>
}

const AddAlbumForm = () => {
    const [openConfirmation, setOpenConfirmation] = useState(false)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            setOpenConfirmation({
                title: values.title,
                year: values.year,
                file: values.file
            })
        }
    })


    const handleChange = (e) => {
        let { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    if (openConfirmation) {
        return <ConfirmAddAlbumForm data={openConfirmation} setOpenConfirmation={setOpenConfirmation} />
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