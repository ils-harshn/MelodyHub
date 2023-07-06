import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/addAlbumFormScehma"
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles"
import { FormCancelButton, FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormInputNumber, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import { FormGroupTwoColumn, FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles"
import { validateYearOnKeyDown } from "../../helpers/regex"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { initiateAddAlbumAction, resetAddAlbumAction } from "../../store/actions/addAlbumActions"
import { useEffect, useState } from "react"
import { resizeImage } from "../../helpers/imageResizers"
import AddAlbumConfirmStyled from "../../styles/Containers/AddAlbumConfirmStyled.styles"
import { Loader, LoaderInScreenCenter } from "../../styles/Loaders/Loaders.styles"
import { checkAlbumCodeExistsAPI, checkAlbumTitleExistsAPI } from "../../api/adminAPIs"

const ConfirmAddAlbumForm = ({ data, setOpenConfirmation }) => {
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const addAlbumReducerState = useSelector(reducers => reducers.addAlbumReducer)
    const dispatch = useDispatch()
    const [resizing, setResizing] = useState(true)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image1Progress, setImage1Progress] = useState(0)
    const [image2Progress, setImage2Progress] = useState(0)
    const navigate = useNavigate()

    const resizeImages = async () => {
        const resizedimage1 = await resizeImage(data.file, data.title, 300, 300)
        const resizedimage2 = await resizeImage(data.file, data.title, 1200, 1200)
        setImage1(resizedimage1)
        setImage2(resizedimage2)
        setResizing(false)
    }

    const progressTracker = (setImageProgress) => {
        return (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImageProgress(progress)
        }
    }

    useEffect(() => {
        resizeImages()
    }, [])

    useEffect(() => {
        console.log(addAlbumReducerState)
        if (addAlbumReducerState.success) {
            navigate("/")            
        }
    }, [addAlbumReducerState])

    if (resizing) {
        return <LoaderInScreenCenter>
            <Loader />
        </LoaderInScreenCenter>
    }

    return <AddAlbumConfirmStyled>
        <div className="preview-container">
            <FormInputGroup>
                <FormInputLabel>Album Code</FormInputLabel>
                <FormInput value={data.code} disabled />
            </FormInputGroup>
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
            <div className="status">
                {
                    image1Progress > 0 && image1Progress < 100 ?
                        <p>Uploading Image for 300x300: {image1Progress}%</p> :
                        image2Progress > 0 && image2Progress < 100 ?
                            <p>Uploading Image for 1200x1200: {image2Progress}%</p> :
                            addAlbumReducerState.loading && <p>Please Wait</p>
                }
            </div>
            <div className="status-error">
                { addAlbumReducerState.error && <p>{addAlbumReducerState.error}</p> }
            </div>
            
            <FormGroupTwoColumn>
                <FormSubmitButton disabled={addAlbumReducerState.loading} onClick={() => dispatch(
                    initiateAddAlbumAction(token, data.code, data.title, data.year, image1, image2, progressTracker(setImage1Progress), progressTracker(setImage2Progress))
                )}>Confirm</FormSubmitButton>
                <FormCancelButton disabled={addAlbumReducerState.loading} onClick={() => setOpenConfirmation(false)}>Back</FormCancelButton>
            </FormGroupTwoColumn>
        </div>
    </AddAlbumConfirmStyled>
}

const AddAlbumForm = () => {
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const token = useSelector(reducers => reducers.loginReducer.user.token)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            checkForm(values)
        }
    })

    const checkForm = async (values) => {
        try {
            let codes = await checkAlbumCodeExistsAPI(token, values.code)
            let titles = await checkAlbumTitleExistsAPI(token, values.title)
            if (codes.data.length || titles.data.length) {
                codes.data.length && formik.setFieldError("code", "Code already exists")
                titles.data.length && formik.setFieldError("title", "Title already exists")
            } else {
                setOpenConfirmation({
                    code: values.code,
                    title: values.title,
                    year: values.year,
                    file: values.file
                })
            }
        } catch (err) {
            formik.setFieldError("code", err.message)
        }
        formik.setSubmitting(false)
    }


    const handleChange = (e) => {
        let { name, value } = e.target;
        formik.setFieldTouched(name, true);
        formik.setFieldValue(name, value);
    }

    if (openConfirmation) {
        return <ConfirmAddAlbumForm data={openConfirmation} setOpenConfirmation={setOpenConfirmation} />
    }

    return <FormWhenCentered onSubmit={formik.handleSubmit}>
        <FormTitle>Add Album</FormTitle>
        <FormInputGroup>
            <FormInputLabel>Album Code</FormInputLabel>
            <FormInput type="text" placeholder="Enter Album Code" name="code" onChange={handleChange} value={formik.values.code} />
            <FormError>{formik.touched.code ? formik.errors.code : ""}</FormError>
        </FormInputGroup>
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
        <FormSubmitButton type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Checking..." : "Submit"}
        </FormSubmitButton>
    </FormWhenCentered>
}

const AddAlbum = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetAddAlbumAction())
    }, [])
    return <>
        <CenterElementsContainerWithScaleInEffectEffect>
            <AddAlbumForm />
        </CenterElementsContainerWithScaleInEffectEffect>
    </>
}

export default AddAlbum